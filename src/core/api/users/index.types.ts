import { Media } from '../media/index.types';

export type IdentityType = 'users' | 'organizations';

export type VerificationStatus = 'NOT_ACTIVE' | 'PENDING' | 'ACTIVE';

export interface UserMeta {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  avatar?: Media;
  cover: Media;
  address?: string | null;
  website?: string;
  city: string;
  country: string;
  language: string | null;
  donates: number;
  impact_points: number;
  identity_verified_at: Date | null;
  project_supported: number;
}

export interface OrgMeta {
  id: string;
  shortname: string;
  name?: string;
  bio?: string;
  description?: string;
  email?: string;
  phone?: string;
  city?: string;
  country?: string;
  address?: string;
  website?: string;
  mission?: string;
  culture?: string;
  logo?: Media;
  cover?: Media;
  status: VerificationStatus;
  verifiedImpact: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Identity {
  id: string;
  type: 'organizations' | 'users';
  meta: OrgMeta | UserMeta;
  current: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IdentitiesRes {
  identities: Identity[];
}
