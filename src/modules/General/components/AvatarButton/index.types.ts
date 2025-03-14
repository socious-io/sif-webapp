import { AccountItem } from '../avatarDropDown/avatarDropDown.types';

export interface AvatarButtonProps {
  account: AccountItem;
  onClick: (account: any) => void;
}
