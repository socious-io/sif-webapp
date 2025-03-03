import { DonateReq } from 'src/core/adaptors';

export interface DonateProjectProps {
  onDonate: (data: DonateReq) => void;
}
