export type IdentityType = 'users' | 'organizations';

export interface UserMeta {
  id: string;
  city: string;
  name: string;
  email: string;
  avatar?: string;
  status?: string;
  address?: string | null;
  country: string;
  username: string;
  open_to_work?: boolean;
  wallet_address?: string | null;
  open_to_volunteer?: boolean;
  identity_verified?: boolean;
  verification_status?: null | 'PENDING' | 'APPROVED' | 'REJECTED';
  is_contributor?: boolean;
}

export interface OrgMeta {
  id: string;
  city: string;
  name: string;
  email: string;
  image: string;
  hiring?: boolean;
  status?: string;
  address?: string;
  country: string;
  mission: string;
  shortname: string;
  description?: string;
  wallet_address?: string;
  verified_impact?: boolean;
  verified?: boolean;
}

export interface Identity {
  id: string;
  type: 'organizations' | 'users';
  meta: OrgMeta | UserMeta;
  created_at: Date;
  identity_meta?: UserMeta | OrgMeta;
  identity_type?: IdentityType;
}
