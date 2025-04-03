import { Media } from '../media/index.types';

export type VerificationStatus = 'NOT_ACTIVE' | 'PENDING' | 'ACTIVE';

export interface KYBReq {
  documents: string[];
}

export interface KYBRes {
  id: string;
  user_id: string;
  organization_id: string;
  status: VerificationStatus;
  documents: Media[];
  created_at: Date;
  updated_at: Date;
}
