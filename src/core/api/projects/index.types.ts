import { Identity, PaginateResV3, Round } from '..';
import { Media } from '../media/index.types';

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'DRAFT';
  city: string;
  country: string;
  social_cause: string;
  identity: Identity;
  cover: Media;
  wallet_address: string;
  website?: string;
  wallet_env: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date | null;
  deleted_at: Date | null;
  total_donations: number;
  total_votes: number;
  user_voted: boolean;
  round: Round;
}

export type ProjectsRes = PaginateResV3<Project>;

export type DonationReq = {
  amount: number;
  currency: string;
  txid: string;
  wallet_address: string;
};

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  reply_id?: string;
  replied: boolean;
  likes: number;
  reported: boolean;
  liked: boolean;
  identity_meta: Identity['meta'];
  identity_type: Identity['type'];
  created_at: Date;
  updated_at: Date;
  emojis?: Emoji[];
}

export interface Emoji {
  created_at: Date;
  emoji: string;
  id: string;
  identity: Identity;
}
export type CommentsRes = PaginateResV3<Comment>;
