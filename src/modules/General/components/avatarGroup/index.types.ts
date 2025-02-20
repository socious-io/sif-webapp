interface Account {
  id: string;
  type?: 'users' | 'organizations';
  image?: string;
}

export interface AvatarGroupProps {
  accounts: Account[];
  length?: number;
  size?: string;
  customStyle?: string;
}
