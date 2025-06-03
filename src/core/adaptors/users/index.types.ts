import { IdentityType, VerificationStatus } from 'src/core/api';

export interface IdentityMetaRes {
  username: string;
  usernameVal: string;
  name: string;
  profileImage: string;
  type: IdentityType | '';
}

export interface CurrentIdentity {
  id: string;
  name: string;
  username: string;
  img: string;
  type: IdentityType;
  current: boolean;
  verified: boolean;
  status?: VerificationStatus;
  impact_points?: number;
}
