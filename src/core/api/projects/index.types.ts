import { Identity, PaginateResV3 } from '..';
import { Media } from '../media/index.types';

export interface Round {
  id: string;
  name: string;
  pool_amount: number;
  cover_id: string | null;
  cover: string | null;
  voting_start_at: Date;
  voting_end_at: Date;
  submission_start_at: string;
  submission_end_at: string;
  total_donations: number;
  total_votes: number;
  total_projects: number;
  voting_announce_at: string | null;
  created_at: string;
  updated_at: string;
}

export type RoundsRes = {
  data: Round[];
  total: number;
};

export type ProjectStatus = 'ACTIVE' | 'DRAFT';

export interface Project {
  id: string;
  title: string;
  description: string;
  city: string;
  country: string;
  social_cause: string;
  identity: Identity;
  cover: Media;
  website: string;
  status: ProjectStatus;
  wallet_address: string;
  wallet_env: string;
  total_donations: { [currency: string]: number };
  total_votes: number;
  user_voted: boolean;
  round: Round;
  feasibility: string;
  goals: string;
  impact_assessment: string;
  linkedin: string;
  problem_statement: string;
  email: string;
  solution: string;
  total_requested_amount: number;
  video: string;
  cost_breakdown: string;
  category: string;
  voluntery_contribution: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date;
  deleted_at: Date;
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

export interface Vote {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
}

export type VotedRes = {
  vote: Vote;
};

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

export type DonationsRes = PaginateResV3<Donation>;

export type DonatedRes = {
  action_required: true;
  client_secret: null;
  donation: Donation;
  message: string;
};

export interface ConfirmDonationReq {
  payment_intent_id: string;
}
