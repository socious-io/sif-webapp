import { IdentityType, VerificationStatus } from 'src/core/api';

export interface IdentityMetaRes {
  username: string;
  usernameVal: string;
  name: string;
  email: string;
  profileImage: string;
  type: IdentityType | '';
}

export interface CurrentIdentity {
  id: string;
  name: string;
  username: string;
  usernameVal?: string;
  img: string;
  email: string;
  type: IdentityType;
  current: boolean;
  verified: boolean;
  status?: VerificationStatus;
  impact_points?: number;
}
