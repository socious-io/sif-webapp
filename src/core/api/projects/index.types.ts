import { Identity, PaginateRes, PaginateResV3, Round } from '..';
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
  feasibility: string;
  goals: string | null;
  impact_assessment: number | null;
  linkdin?: string | null;
  problem_statement: string;
  email?: string;
  solution?: string;
  total_requested_amount: number | null;
  video: string;
  cost_beakdown: string;
  category: string;
  voluntery_contribution: string;
}

export type ProjectsRes = PaginateResV3<Project>;

export type DonationReq = {
  amount: number;
  currency?: string;
  txid?: string;
  wallet_address?: string;
  payment_type?: 'FIAT' | 'CRYPTO';
  card_token?: string;
};

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  reply_id?: string;
  replied: boolean;
  likes: number;
  reported: boolean;
  identity_reaction?: string;
  liked: boolean;
  identity: Identity;
  identity_type: Identity['type'];
  created_at: Date;
  updated_at: Date;
  reactions?: Reaction[];
  children?: Comment[];
}

export interface Reaction {
  count: number;
  reaction: string;
}
export type CommentsRes = PaginateResV3<Comment>;

export interface CommentReq {
  content: string;
  parent_id?: string;
}
