import { ReactNode } from 'react';
import { CurrentIdentity } from 'src/core/adaptors';

import { IconListItemProps } from '../avatarDropDown/iconListItem';

export interface IconDropDownProps {
  type: 'organizations' | 'users';
  img?: string;
  iconName?: string;
  accounts?: CurrentIdentity[];
  iconItems?: IconListItemProps[];
  customItems?: ReactNode[];
  size?: string;
  customStyle?: string;
  createItem?: boolean;
}
