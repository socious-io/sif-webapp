import { Media } from '../media/index.types';

export type IdentityType = 'users' | 'organizations';

export interface UserMeta {
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
  status: string;
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
