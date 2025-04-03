import { ReactNode } from 'react';
import { CurrentIdentity } from 'src/core/adaptors';

export interface IconListItemProps {
  iconName?: string;
  label: string;
  onClick?: () => void;
  customIconClass?: string;
  customLabelClass?: string;
}

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
