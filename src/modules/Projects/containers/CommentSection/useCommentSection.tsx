import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addComment,
  CommentsRes,
  getComments,
  Comment,
  CurrentIdentity,
  reactProjectComment,
  unreactProjectComment,
} from 'src/core/api';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';

type StateType = {
  comments: Comment[];
  replies: Record<string, Comment & { showed?: boolean }>;
};

type ActionType = { type: 'comments'; value: StateType['comments'] } | { type: 'replies'; value: StateType['replies'] };

const feedReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'comments':
      return { ...state, comments: action.value };
    case 'replies':
      return { ...state, replies: action.value };
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
  const limit = 5;

  const [state, dispatch] = useReducer(feedReducer, {
    comments: [],
    replies: {},
  });

  const postComment = async (postId: string, content: string, parentId?: string) => {
    console.log('parent', parentId);
    const newComment = await addComment(postId, { content, ...(parentId && { parent_id: parentId }) });
    dispatch({
      type: 'comments',
      value: [...state.comments, newComment],
    });
    return newComment;
  };

  const addReply = (reply: CommentsRes & { showed?: boolean }) => {
    dispatch({
      type: 'replies',
      value: { ...state.replies, [reply.id]: reply },
    });
  };

  const toggleReplyVisibility = (replyId: string) => {
    dispatch({
      type: 'replies',
      value: {
        ...state.replies,
        [replyId]: { ...state.replies[replyId], showed: !state.replies[replyId].showed },
      },
    });
  };

  const fetchComments = async (projectId: string, pageNum = 1) => {
    const comments = await getComments(projectId, { page: pageNum, limit });
    dispatch({
      type: 'comments',
      value: pageNum === 1 ? comments.results : [...state.comments, ...comments.results],
    });
    setShowMore(comments.results.length > 0 && state.comments.length + comments.results.length < (comments.total || 0));
  };

  const seeMore = () => {
    setPage(page + 1);
    fetchComments(projectId, page + 1);
  };

  const onReplyClick = userInfo => {
    console.log('userInfo', userInfo.commentId);
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
    console.log('handleSendReply', replyCommentId);
    if (!replyText.trim()) {
      setError(translate('feeds-empty-comment-error'));
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await postComment(projectId, replyText, replyCommentId);
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

  const commentList = state.comments;

  const repliesByComment = Object.values(state.replies).reduce((acc, reply) => {
    if (reply.reply_id) {
      acc[reply.reply_id] = {
        items: [...(acc[reply.reply_id]?.items || []), reply],
        total_count: (acc[reply.reply_id]?.total_count || 0) + 1,
      };
    }
    return acc;
  }, {});

  const avatarImage = currentIdentity?.type === 'organizations' ? currentIdentity.meta.logo.url : '';

  return {
    state,
    postComment,
    addReply,
    toggleReplyVisibility,
    fetchComments,
    commentList,
    repliesByComment,
    avatarImage,
    reactProjectComment,
    unreactProjectComment,
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
  };
};
