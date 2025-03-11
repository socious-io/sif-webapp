import { IdentityType } from 'src/core/api';

export interface IdentityMetaRes {
  username: string;
  usernameVal: string;
  name: string;
  profileImage: string;
  type: IdentityType | '';
}
