import { DonateReq } from 'src/core/adaptors';

export interface FiatDonationProps {
  onDonate: (data: DonateReq) => void;
}
