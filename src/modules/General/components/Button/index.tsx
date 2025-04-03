import { Button as MaterialButton } from '@mui/material';

import styles from './index.module.scss';
import { ButtonProps } from './index.types';

const Button: React.FC<ButtonProps> = ({
  children,
  customStyle,
  color = 'primary',
  variant = 'contained',
  block,
  ...props
}) => {
  const size = block ? styles['block'] : null;

  return (
    <MaterialButton
      disableRipple
      className={`${styles['default']} ${styles[color]} ${size} ${customStyle}`}
      color={color}
      variant={variant}
      {...props}
    >
      {children}
    </MaterialButton>
  );
};

export default Button;
