import { Skeleton, Box } from '@mui/material';
import { translate } from 'src/core/helpers/utils';

import { useCommentSection } from './useCommentSection';
import Comments from '../../components/Comments';
import SendBox from '../../components/sendBox';

const CommentSection = ({ projectId }: { projectId: string }) => {
  const {
    commentList,
    repliesByComment,
    toggleReplyVisibility,
    state,
    avatarImage,
    reactProjectComment,
    onReplyClick,
    showReplySection,
    showMore,
    seeMore,
    commentText,
    setCommentText,
    replyText,
    setReplyText,
    isSubmitting,
    error,
    setError,
    handleSendComment,
    handleSendReply,
    replyCommentId,
  } = useCommentSection(projectId);

  const isLoading = state.comments.length === 0;

  return (
    <div className="mt-10 flex flex-col gap-6">
      {isLoading ? (
        <Box>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={80} sx={{ marginBottom: 2, borderRadius: 1 }} />
          ))}
        </Box>
      ) : (
        <Comments
          postId={projectId}
          list={commentList}
          onReply={userInfo => {
            onReplyClick(userInfo);
          }}
          replies={repliesByComment}
          onShowReplies={commentId => {
            toggleReplyVisibility(commentId);
          }}
          onSeeMoreRepliesClick={commentId => {}}
          reactProjectComment={reactProjectComment}
        />
      )}
      {showMore && (
        <span className="see-more text-center" onClick={seeMore}>
          {translate('feeds-see-more')}
        </span>
      )}
      <SendBox
        name="comment"
        buttonText={translate('feeds-reply')}
        userImg={avatarImage}
        placeholder={translate('feeds-action-comment')}
        value={commentText}
        onChange={value => {
          setCommentText(value);
          setError(null);
        }}
        onEmojiSelect={emoji => setCommentText(prev => prev + emoji)}
        onSend={handleSendComment}
        disabled={isSubmitting}
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {showReplySection && (
        <SendBox
          name="comment"
          buttonText={translate('feeds-reply')}
          userImg={avatarImage}
          placeholder={translate('feeds-reply-to', { name: 'Iman' })}
          value={replyText}
          onChange={value => {
            setReplyText(value);
            setError(null);
          }}
          onEmojiSelect={emoji => setReplyText(prev => prev + emoji)}
          onSend={handleSendReply}
          disabled={isSubmitting}
        />
      )}
    </div>
  );
};

export default CommentSection;
