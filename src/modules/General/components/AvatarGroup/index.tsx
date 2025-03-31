import { AvatarGroupProps } from './index.types';
import Avatar from '../Avatar';

// If we use Identity
const AvatarGroup: React.FC<AvatarGroupProps> = ({
  accounts,
  length = accounts.length,
  size = '32px',
  customStyle = '',
}) => {
  return (
    <div className="flex items-center">
      {accounts.slice(0, length).map(account => {
        return (
          <Avatar
            key={account.id}
            size={size}
            type={account.type || 'users'}
            img={account.image || ''}
            customStyle={`ml-[-8px] ${customStyle}`}
          />
        );
      })}
    </div>
  );
};

export default AvatarGroup;
