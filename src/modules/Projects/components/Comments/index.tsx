import React from 'react';
import { getIdentityMeta } from 'src/core/adaptors/users/index.adaptors';
import { toRelativeTime } from 'src/core/helpers/date-helpers';
import { translate } from 'src/core/helpers/utils';
import Avatar from 'src/modules/General/components/Avatar';
import CustomEmojiPicker from 'src/modules/General/components/EmojiPicker';
import ExpandableText from 'src/modules/General/components/ExpandableText';
import Icon from 'src/modules/General/components/Icon';

import { CommentsProps } from './index.types';
import Replies from './Replies';
import { useComments } from './useComments';

const Comments: React.FC<CommentsProps> = ({
  postId,
  list,
  onReply,
  onShowReplies,
  replies = [],
  onSeeMoreRepliesClick,
  reactProjectComment,
  unreactProjectComment,
  restrictReply,
}) => {
  const {
    data: { emojis, activeEmojiPickerCommentId },
    operations: { setActiveEmojiPickerCommentId, onPreviewClick, onEmojiSelect },
  } = useComments(list, reactProjectComment, unreactProjectComment);
  return (
    <>
      {list.map(item => {
        const { type, name, profileImage } = getIdentityMeta(item.identity);
        return (
          <div key={item.id} className="flex gap-3 items-start">
            <Avatar type={type || 'users'} size="2rem" img={(profileImage as string) || ''} />
            <div className="flex-1 flex flex-col relative gap-1">
              <div className="flex justify-between">
                <span className="text-sm text-Gray-light-mode-900">{name}</span>
                <span className="text-xs text-Gray-light-mode-600">
                  {toRelativeTime(new Date(item.created_at).toString())}
                </span>
              </div>
              <ExpandableText
                text={item.content}
                expectedLength={100}
                isMarkdown
                customStyle="bg-Gray-light-mode-100 py-2 px-3 rounded-default emoji-font break-all"
              />
              <div className="flex items-center gap-1">
                <Icon
                  name="face-smile"
                  fontSize={19}
                  className="text-Gray-light-mode-500"
                  cursor="pointer"
                  containerClass="cursor-pointer bg-Gray-light-mode-50 py-1 px-2 rounded-xl"
                  onClick={() => setActiveEmojiPickerCommentId(item.id)}
                />
                {!!emojis[item.id]?.length &&
                  emojis[item.id].map(emoji => (
                    <div
                      key={emoji.emoji}
                      className="emoji-font cursor-pointer bg-Gray-light-mode-50 py-1 px-2 rounded-xl text-sm text-Gray-light-mode-600"
                      onClick={() => onPreviewClick(emoji.emoji, item.id)}
                    >
                      {!!emoji?.count && emoji.count}
                      {emoji.emoji}
                    </div>
                  ))}
                {restrictReply && (
                  <span
                    className="text-sm text-Gray-light-mode-600 cursor-pointer ml-1"
                    onClick={() => onReply({ replyTo: name || '', commentId: item.id })}
                  >
                    {translate('feeds-reply')}
                  </span>
                )}
              </div>
              {activeEmojiPickerCommentId === item.id && (
                <CustomEmojiPicker
                  open={activeEmojiPickerCommentId === item.id}
                  handleClose={() => setActiveEmojiPickerCommentId(null)}
                  onEmojiSelect={({ native }) => onEmojiSelect(native, item.id)}
                  customStyle="top-[-212px]"
                />
              )}
              {item.children ? (
                <Replies
                  postId={postId}
                  commentId={item.id}
                  list={item.children}
                  showSeeMore={true}
                  onSeeMoreClick={() => onSeeMoreRepliesClick?.(item.id)}
                  reactProjectComment={reactProjectComment}
                />
              ) : (
                (replies[item.id] || item.replied) && (
                  <span className="see-more text-center" onClick={() => onShowReplies?.(item.id)}>
                    {translate('feeds-show-replies')}
                  </span>
                )
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
