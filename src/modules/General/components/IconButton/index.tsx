import { IconButton as MUIIconButton } from '@mui/material';

import styles from './index.module.scss';
import { IconButtonProps } from './index.types';
import Icon from '../Icon';

const IconButton: React.FC<IconButtonProps> = ({
  size = 'medium',
  iconName,
  iconSize,
  iconColor,
  handleClick,
  customStyle,
  ...props
}) => {
  const mappedSize = {
    small: 'sm',
    medium: 'md',
    large: 'lg',
  };

  return (
    <MUIIconButton
      className={`${styles['btn']} ${styles[mappedSize[size]]} ${customStyle} `}
      onClick={handleClick}
      {...props}
    >
      <Icon fontSize={iconSize} name={iconName} color={iconColor} cursor="pointer" />
    </MUIIconButton>
  );
};

export default IconButton;
