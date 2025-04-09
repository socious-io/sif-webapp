import { IdentityType } from 'src/core/api';

export type Account = {
  id: string;
  name: string;
  username: string;
  img: string;
  type: IdentityType;
};

export interface AvatarLabelGroupProps {
  account: Account;
  customStyle?: string;
  handleClick?: () => void;
  avatarSize?: string;
  removeFull?: boolean;
}
