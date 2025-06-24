import React from 'react';
import { getIdentityMeta } from 'src/core/adaptors/users/index.adaptors';
import { toRelativeTime } from 'src/core/helpers/date-helpers';

import { RepliesProps } from './index.types';
import { useReplies } from './useReplies';
import Avatar from '../../../../General/components/Avatar';
import CustomEmojiPicker from '../../../../General/components/EmojiPicker';
import ExpandableText from '../../../../General/components/ExpandableText';
import Icon from '../../../../General/components/Icon';

const Replies: React.FC<RepliesProps> = ({ postId, commentId, list, reactProjectComment }) => {
  const {
    data: { emojis, openEmojiPicker },
    operations: { setOpenEmojiPicker, onPreviewClick, onEmojiSelect },
  } = useReplies(postId, commentId, list, reactProjectComment);
  return (
    <>
      {list.map(item => {
        const { profileImage, type, name } = getIdentityMeta(item.identity);
        return (
          <div key={item.id} className="flex gap-3 mt-1 items-start">
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
                customStyle="bg-Gray-light-mode-100 py-2 px-3 rounded-default emoji-font break-all"
              />
              <div className="flex items-center gap-1">
                {/* <Icon
                  name="face-smile"
                  fontSize={19}
                  className="text-Gray-light-mode-500"
                  cursor="pointer"
                  containerClass="cursor-pointer bg-Gray-light-mode-50 py-1 px-2 rounded-xl"
                  onClick={() => setOpenEmojiPicker(true)}
                /> */}
                {/* {!!emojis[item.id]?.length &&
                  emojis[item.id].map(emoji => (
                    <div
                      key={emoji.emoji}
                      className="emoji-font cursor-pointer bg-Gray-light-mode-50 py-1 px-2 rounded-xl text-sm text-Gray-light-mode-600"
                      onClick={() => onPreviewClick(emoji.emoji, item.id)}
                    >
                      {!!emoji?.count && emoji?.count}
                      {emoji.emoji}
                    </div>
                  ))} */}
              </div>
              {/* {openEmojiPicker && (
                <CustomEmojiPicker
                  open={!!openEmojiPicker}
                  handleClose={() => setOpenEmojiPicker(false)}
                  onEmojiSelect={({ native }) => onEmojiSelect(native, item.id)}
                  customStyle="top-[-212px]"
                />
              )} */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Replies;
