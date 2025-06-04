import { Comment, CommentsRes, Identity } from 'src/core/api';

export type ReplyInfo = { replyTo: string; commentId: string };

export type SelectedEmoji = {
  emoji: string;
  count: number;
};

export interface CommentsProps {
  postId: string;
  list: Comment[];
  onReply: (userInfo: ReplyInfo) => void;
  onShowReplies?: (commentId: string) => void;
  replies?: Record<string, CommentsRes>;
  onSeeMoreRepliesClick?: (commentId: string) => void;
  reactProjectComment: (commentId: string, reaction: string) => void;
  unreactProjectComment: (commentId: string) => void;
  restrictReply: boolean;
}
