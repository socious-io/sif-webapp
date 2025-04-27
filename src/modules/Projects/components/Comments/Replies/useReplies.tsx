import { useEffect, useState } from 'react';
import { Comment } from 'src/core/api';

import { SelectedEmoji } from '../index.types';

export const useReplies = (postId: string, commentId: string, list: Comment[], reactProjectComment) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [emojis, setEmojis] = useState<Record<string, SelectedEmoji[]>>({});
  const defaultRecommendedEmojis = [
    { emoji: '❤️', count: 0 },
    { emoji: '👌', count: 0 },
    { emoji: '🙂', count: 0 },
  ];

  useEffect(() => {
    const commentsWithEmojisMap: Record<string, SelectedEmoji[]> = {};
    list.forEach(comment => {
      const commentId = comment.id;
      const existingEmojis: SelectedEmoji[] = [];
      (comment.reactions || []).forEach(reaction => {
        if (!reaction.count) {
          return { emoji: reaction.reaction, count: 0 };
        }
        const index = existingEmojis.findIndex(item => item.emoji === reaction.reaction);
        if (index !== -1) {
          existingEmojis[index].count++;
        } else {
          existingEmojis.push({ emoji: reaction.reaction, count: reaction.count });
        }
      });
      const mergedEmojis = defaultRecommendedEmojis.map(defaultEmoji => {
        const existingEmoji = existingEmojis.find(emoji => emoji.emoji === defaultEmoji.emoji);
        return existingEmoji ? { ...defaultEmoji, count: existingEmoji.count } : defaultEmoji;
      });
      existingEmojis.forEach(existingEmoji => {
        if (!mergedEmojis.find(emoji => emoji.emoji === existingEmoji.emoji)) {
          mergedEmojis.push(existingEmoji);
        }
      });
      commentsWithEmojisMap[commentId] = mergedEmojis;
    });
    setEmojis(commentsWithEmojisMap);
  }, [list]);

  const onPreviewClick = async (reactName: string, replyId: string) => {
    await reactProjectComment(commentId, reactName, replyId);
  };

  const onEmojiSelect = async (emojiName: string) => {
    await reactProjectComment(commentId, emojiName, commentId);
    setOpenEmojiPicker(false);
  };

  return {
    data: { emojis, openEmojiPicker },
    operations: { setOpenEmojiPicker, onPreviewClick, onEmojiSelect },
  };
};
