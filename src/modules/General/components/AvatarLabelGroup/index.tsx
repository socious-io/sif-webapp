import { Typography } from '@mui/material';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { AvatarLabelGroupProps } from './index.types';
import Avatar from '../Avatar';

const AvatarLabelGroup: React.FC<AvatarLabelGroupProps> = props => {
  const { account, customStyle, handleClick, avatarSize, removeFull = false } = props;

  return (
    <div
      data-testid="avatar-label-group"
      className={`${styles['container']} ${!removeFull && styles['container--full']} ${customStyle} ${handleClick && 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <Avatar img={account.img} type={account.type} size={avatarSize || '40px'} />
      <div className={styles['info']}>
        <Typography variant="subtitle2" color={variables.color_grey_900}>
          {account.name}
        </Typography>
        <div className={styles['subtitle']}>{account.username}</div>
      </div>
    </div>
  );
};

export default AvatarLabelGroup;
