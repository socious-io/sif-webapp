import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

import { SelectedEmoji } from './index.types';

export const useComments = (postId: string, list: Comment[], reactProjectComment) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const currentIdentityId = currentIdentity?.id;

  const [openEmojiPicker, setOpenEmojiPicker] = useState('');
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
    console.log(commentsWithEmojisMap, 'MMM');
    setEmojis(commentsWithEmojisMap);
  }, [list]);

  const reactedCurrentIdentity = (emojiName: string, commentId: string) => {
    // const findIdentity = emojis[commentId]?.find(emoji => {
    //   //if user identity reaction is same -- otherwise none
    //   if (emojiName === emoji.emoji) {
    //     return emoji.reac.findIndex(identity => identity.id === currentIdentityId) !== -1;
    //   } else {
    //     return false;
    //   }
    // });
    // return findIdentity;
    return;
  };

  const updateCommentWithEmojis = (commentId: string, newEmojis: SelectedEmoji[]) => {
    //FIXME: it's better the structure of emojis in response of API changed. (BE)
    const updatedList = list.map(comment => {
      if (comment.id === commentId) {
        const updatedEmojis = newEmojis.flatMap(emoji =>
          emoji.identities.map(identity => ({
            emoji: emoji.emoji,
            identity: identity,
          })),
        );
        return {
          ...comment,
          emojis: updatedEmojis,
        };
      }
      return comment;
    });

    // dispatch({
    //   type: 'comments',
    //   value: { ...comments, [postId]: { ...comments[postId], items: updatedList as Comment[] } },
    // });
  };

  const onPreviewClick = async (emojiName: string, commentId: string) => {
    try {
      const findIdentity = reactedCurrentIdentity(emojiName, commentId);
      if (findIdentity) {
        // await unreactPostComment(postId, commentId, emojiName);
        const updatedEmojis =
          emojis[commentId]?.map(emoji => {
            if (emoji.emoji !== emojiName) {
              return emoji;
            } else {
              const filteredIdentities = emoji.identities.filter(identity => identity.id !== currentIdentityId);
              return { ...emoji, identities: filteredIdentities };
            }
          }) || [];
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      } else {
        await reactProjectComment(commentId, emojiName);
        const updatedEmojis = (emojis[commentId] || []).map(emoji => {
          if (emoji.emoji === emojiName) {
            return { ...emoji, identities: [...emoji.identities, { id: currentIdentityId }] };
          } else {
            return emoji;
          }
        });
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      }
    } catch (error) {
      console.log('error in un/reacting comments', error);
    }
  };

  const onEmojiSelect = async (emojiName: string, commentId: string) => {
    try {
      const findIdentity = reactedCurrentIdentity(emojiName, commentId);
      if (findIdentity) {
        // await unreactPostComment(postId, commentId, emojiName);
        const updatedEmojis =
          emojis[commentId]?.map(emoji => {
            if (emoji.emoji !== emojiName) {
              return emoji;
            } else {
              const filteredIdentities = emoji.identities.filter(identity => identity.id !== currentIdentityId);
              return { emoji: emoji.emoji, identities: filteredIdentities };
            }
          }) || [];
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      } else {
        // await reactPostComment(postId, commentId, emojiName);
        const updatedEmojis =
          emojis[commentId]?.map(emoji => {
            if (emoji.emoji === emojiName) {
              return { ...emoji, identities: [...emoji.identities, { id: currentIdentityId }] };
            } else {
              return emoji;
            }
          }) || [];
        if (!updatedEmojis.some(emoji => emoji.emoji === emojiName)) {
          updatedEmojis.push({ emoji: emojiName, identities: [{ id: currentIdentityId }] });
        }
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      }
    } catch (error) {
      console.log('error in un/reacting comments', error);
    }
    setOpenEmojiPicker('');
  };

  return {
    data: { emojis, openEmojiPicker },
    operations: { setOpenEmojiPicker, onPreviewClick, onEmojiSelect },
  };
};
