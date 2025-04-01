import { ModalProps } from 'src/modules/General/components/Modal/index.types';

export type VoteInfo = {
  receivedAmount: string;
};

export type DonateInfo = {
  donate: string;
  currency: string;
  donateConversion: string;
  estimatedMatch?: string;
  totalContribution?: string;
};

export interface SuccessModalProps extends ModalProps {
  projectTitle: string;
  voteInfo?: VoteInfo;
  donateInfo?: DonateInfo;
  onContinue: () => void;
}
