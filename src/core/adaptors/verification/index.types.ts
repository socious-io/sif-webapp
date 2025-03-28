import { VerificationStatus } from 'src/core/api';

export interface VerificationRes {
  message?: string;
  status: VerificationStatus;
}
