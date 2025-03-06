import { Media } from '../media/index.types';
import { PaginateRes } from '../types';
import { Identity } from '../users/index.types';

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
  website?: string;
  wallet_address: string;
  wallet_env: string;
  created_at: Date;
  updated_at: Date;
  expires_at: Date | null;
  deleted_at: Date | null;
}

export type ProjectsRes = PaginateRes<Project>;
