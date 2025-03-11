import { IconButton as MUIIconButton } from '@mui/material';
import React from 'react';

import css from './index.module.scss';
import { IconButtonProps } from './index.types';
import Icon from '../Icon';

const IconButton: React.FC<IconButtonProps> = ({
  size = 'medium',
  iconName,
  img,
  iconSize,
  iconColor,
  handleClick,
  customStyle,
  ...props
}) => {
  // FIXME: Add new icons to icon pack and use Icon instead of img
  return (
    <MUIIconButton
      className={`${css.btn} ${
        size === 'small' ? `${css.sm}` : size === 'medium' ? `${css.md}` : `${css.lg}`
      } ${customStyle} `}
      onClick={handleClick}
      {...props}
    >
      {iconName ? <Icon fontSize={iconSize} name={iconName} color={iconColor} cursor="pointer" /> : img}
    </MUIIconButton>
  );
};

export default IconButton;
