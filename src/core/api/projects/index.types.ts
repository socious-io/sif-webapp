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
  linkedin?: string | null;
  problem_statement: string;
  email?: string;
  solution?: string;
  total_requested_amount: number | null;
  video: string;
  cost_breakdown: string;
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
  rate: number;
  anonymous?: boolean;
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

export interface Donation {
  amount: number;
  anonymous: boolean;
  created_at: string;
  currency: string;
  id: string;
  project_id: string;
  rate: number;
  release_transaction_id: string | null;
  status: string;
  transaction_id: string | null;
  updated_at: string;
  user: {
    address: string | null;
    avatar: string | null;
    city: string | null;
    country: string | null;
    cover: string | null;
    created_at: string;
    deleted_at: string | null;
    donates: number;
    email: string;
    first_name: string;
    id: string;
    identity_verified_at: string | null;
    impact_points: number;
    language: string | null;
    last_name: string;
    project_supported: number;
    referred_by: string | null;
    stripe_customer_id: string | null;
    updated_at: string;
    username: string;
    user_id: string;
  };
}
export type DonationRes = PaginateResV3<Donation>;
