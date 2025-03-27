import { DonateReq } from 'src/core/adaptors';

export type Form = {
  donate: string;
  currency: string;
  preventDisplayName: boolean;
};

export interface DonateProjectProps {
  isLoading: boolean;
  onDonate: (data: DonateReq) => void;
}
