import { Account } from '../AvatarLabelGroup/index.types';

export interface AvatarButtonProps {
  account: Account;
  onClick: (account: Account) => void;
}
