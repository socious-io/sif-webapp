import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/adaptors';
import {
  addComment,
  getComments,
  Comment,
  reactProjectComment,
  unreactProjectComment,
  UserMeta,
  OrgMeta,
} from 'src/core/api';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';

type StateType = {
  comments: Comment[];
};

type ActionType = { type: 'comments'; value: StateType['comments'] };

const feedReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'comments':
      return { ...state, comments: action.value };
    default:
      throw new Error();
  }
};

export const useCommentSection = (projectId: string) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const [showReplySection, setShowReplySection] = useState(false);
  const [replyCommentId, setReplyCommentId] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [page, setPage] = useState(1);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const [state, dispatch] = useReducer(feedReducer, {
    comments: [],
  });

  const postComment = async (postId: string, content: string, parentId?: string) => {
    const newComment = await addComment(postId, { content, ...(parentId && { parent_id: parentId }) });
    dispatch({
      type: 'comments',
      value: [...state.comments, newComment],
    });
    return newComment;
  };

  const fetchComments = async (projectId: string, pageNum = 1) => {
    setLoading(true);
    try {
      const comments = await getComments(projectId, { page: pageNum, limit });
      dispatch({
        type: 'comments',
        value: pageNum === 1 ? comments.results : [...state.comments, ...comments.results],
      });
      setShowMore(
        comments.results.length > 0 && state.comments.length + comments.results.length < (comments.total || 0),
      );
    } finally {
      setLoading(false);
    }
  };

  const reactToComment = async (commentId: string, reaction: string, replyId?: string) => {
    try {
      if (replyId) {
        const parentComment = state.comments.find(c => c.id === commentId);
        const reply = parentComment?.children?.find(r => r.id === replyId);
        if (!reply) return;
        if (reply.identity_reaction === reaction) {
          await unreactProjectComment(commentId);
          const updatedComments = state.comments.map(c => {
            if (c.id === replyId) {
              return {
                ...c,
                children: (c.children || []).map(r =>
                  r.id === commentId
                    ? {
                        ...r,
                        reactions: (r.reactions || [])
                          .map(re => (re.reaction === reaction ? { ...re, count: re.count - 1 } : re))
                          .filter(re => re.count > 0),
                        identity_reaction: undefined,
                        liked: false,
                      }
                    : r,
                ),
              };
            }
            return c;
          });
          dispatch({
            type: 'comments',
            value: updatedComments,
          });
        } else {
          await reactProjectComment(commentId, reaction);
          const updatedComments = state.comments.map(c => {
            if (c.id === replyId) {
              return {
                ...c,
                children: (c.children || []).map(r =>
                  r.id === commentId
                    ? {
                        ...r,
                        reactions: (() => {
                          let updatedReactions = r.reactions || [];
                          if (r.identity_reaction) {
                            updatedReactions = updatedReactions
                              .map(re => (re.reaction === r.identity_reaction ? { ...re, count: re.count - 1 } : re))
                              .filter(re => re.count > 0);
                          }
                          const reactionExists = updatedReactions.find(re => re.reaction === reaction);
                          if (reactionExists) {
                            updatedReactions = updatedReactions.map(re =>
                              re.reaction === reaction ? { ...re, count: re.count + 1 } : re,
                            );
                          } else {
                            updatedReactions = [...updatedReactions, { reaction, count: 1 }];
                          }
                          return updatedReactions;
                        })(),
                        identity_reaction: reaction,
                        liked: reaction === 'LIKE',
                      }
                    : r,
                ),
              };
            }
            return c;
          });
          dispatch({
            type: 'comments',
            value: updatedComments,
          });
        }
      } else {
        const comment = state.comments.find(c => c.id === commentId);
        if (!comment) return;

        if (comment.identity_reaction === reaction) {
          await unreactProjectComment(commentId);
          const updatedComments = state.comments.map(c => {
            if (c.id === commentId) {
              const updatedReactions = (c.reactions || [])
                .map(r => (r.reaction === reaction ? { ...r, count: r.count - 1 } : r))
                .filter(r => r.count > 0);
              return {
                ...c,
                reactions: updatedReactions,
                identity_reaction: undefined,
                liked: false,
              };
            }
            return c;
          });
          dispatch({
            type: 'comments',
            value: updatedComments,
          });
        } else {
          await reactProjectComment(commentId, reaction);
          const updatedComments = state.comments.map(c => {
            if (c.id === commentId) {
              let updatedReactions = c.reactions || [];
              if (c.identity_reaction) {
                updatedReactions = updatedReactions
                  .map(r => (r.reaction === c.identity_reaction ? { ...r, count: r.count - 1 } : r))
                  .filter(r => r.count > 0);
              }
              const reactionExists = updatedReactions.find(r => r.reaction === reaction);
              if (reactionExists) {
                updatedReactions = updatedReactions.map(r =>
                  r.reaction === reaction ? { ...r, count: r.count + 1 } : r,
                );
              } else {
                updatedReactions = [...updatedReactions, { reaction, count: 1 }];
              }
              return {
                ...c,
                reactions: updatedReactions,
                identity_reaction: reaction,
                liked: reaction === 'LIKE',
              };
            }
            return c;
          });
          dispatch({
            type: 'comments',
            value: updatedComments,
          });
        }
      }
    } catch (error) {
      setError(translate('feeds-comment-reaction-error'));
    }
  };

  const unreactToComment = async (commentId: string, replyId?: string) => {
    try {
      if (replyId) {
        const parentComment = state.comments.find(c => c.id === replyId);
        const reply = parentComment?.children?.find(r => r.id === commentId);
        if (!reply || !reply.identity_reaction) return;

        await unreactProjectComment(commentId);
        const updatedComments = state.comments.map(c => {
          if (c.id === replyId) {
            return {
              ...c,
              children: (c.children || []).map(r =>
                r.id === commentId
                  ? {
                      ...r,
                      reactions: (r.reactions || [])
                        .map(re => (re.reaction === r.identity_reaction ? { ...re, count: re.count - 1 } : re))
                        .filter(re => re.count > 0),
                      identity_reaction: undefined,
                      liked: false,
                    }
                  : r,
              ),
            };
          }
          return c;
        });
        dispatch({
          type: 'comments',
          value: updatedComments,
        });
      } else {
        const comment = state.comments.find(c => c.id === commentId);
        if (!comment || !comment.identity_reaction) return;

        await unreactProjectComment(commentId);
        const updatedComments = state.comments.map(c => {
          if (c.id === commentId) {
            const updatedReactions = (c.reactions || [])
              .map(r => (r.reaction === comment.identity_reaction ? { ...r, count: r.count - 1 } : r))
              .filter(r => r.count > 0);
            return {
              ...c,
              reactions: updatedReactions,
              identity_reaction: undefined,
              liked: false,
            };
          }
          return c;
        });
        dispatch({
          type: 'comments',
          value: updatedComments,
        });
      }
    } catch (error) {
      setError(translate('feeds-comment-unreaction-error'));
    }
  };

  const seeMore = () => {
    setPage(page + 1);
    fetchComments(projectId, page + 1);
  };

  const onReplyClick = userInfo => {
    setReplyCommentId(userInfo.commentId);
    setShowReplySection(true);
  };

  const handleSendComment = async () => {
    if (!commentText.trim()) {
      setError(translate('feeds-empty-comment-error'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await postComment(projectId, commentText);
      setCommentText('');
    } catch (error) {
      setError(translate('feeds-comment-post-error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      setError(translate('feeds-empty-comment-error'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newReply = await postComment(projectId, replyText, replyCommentId);
      const updatedComments = state.comments.map(comment => {
        if (comment.id === replyCommentId) {
          return {
            ...comment,
            children: [...(comment.children || []), newReply],
          };
        }
        return comment;
      });
      dispatch({
        type: 'comments',
        value: updatedComments,
      });
      setReplyText('');
      setShowReplySection(false);
    } catch (error) {
      setError(translate('feeds-comment-post-error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchComments(projectId);
    }
  }, [projectId]);
  const restrictComment = currentIdentity?.verified || false;
  const commentList = state.comments;
  const avatarImage = currentIdentity?.img;
  const comment = state.comments.find(c => c.id === replyCommentId);
  const replyToName =
    comment?.identity.type === 'users'
      ? (comment?.identity.meta as UserMeta)?.username
      : (comment?.identity.meta as OrgMeta)?.shortname;
  return {
    state,
    postComment,
    fetchComments,
    commentList,
    avatarImage,
    reactToComment,
    unreactToComment,
    onReplyClick,
    showReplySection,
    setShowReplySection,
    seeMore,
    showMore,
    commentText,
    setCommentText,
    replyText,
    setReplyText,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    handleSendComment,
    handleSendReply,
    replyCommentId,
    loading,
    replyToName,
    restrictComment,
  };
};
