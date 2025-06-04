import { Skeleton, Box } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Comments from 'src/modules/Projects/components/Comments';
import SendBox from 'src/modules/Projects/components/sendBox';

import { useCommentSection } from './useCommentSection';

const CommentSection = ({ projectId }: { projectId: string }) => {
  const {
    commentList,
    avatarImage,
    reactToComment,
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
    unreactToComment,
    replyToName,
    loading,
    restrictComment,
  } = useCommentSection(projectId);

  return (
    <div className="mt-10 flex flex-col gap-6">
      {loading ? (
        <Box>
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={80} sx={{ marginBottom: 2, borderRadius: 1 }} />
          ))}
        </Box>
      ) : (
        <Comments
          restrictReply={restrictComment}
          postId={projectId}
          list={commentList}
          onReply={userInfo => {
            onReplyClick(userInfo);
          }}
          reactProjectComment={reactToComment}
          unreactProjectComment={unreactToComment}
        />
      )}
      {showMore && (
        <span className="see-more text-center" onClick={seeMore}>
          {translate('feeds-see-more')}
        </span>
      )}
      {restrictComment && (
        <>
          <SendBox
            name="comment"
            buttonText={translate('feeds-reply')}
            userImg={avatarImage as string}
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
              userImg={avatarImage as string}
              placeholder={translate('feeds-reply-to', { name: replyToName })}
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
        </>
      )}
    </div>
  );
};

export default CommentSection;
