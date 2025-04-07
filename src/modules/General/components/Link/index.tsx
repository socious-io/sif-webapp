import { Link as MuiLink } from '@mui/material';

import styles from './index.module.scss';
import { LinkProps } from './index.types';

const Link: React.FC<LinkProps> = props => {
  const { label, href, customStyle, target = '_self' } = props;
  return (
    <MuiLink className={`${styles['link']} ${customStyle}`} href={href} target={target} {...props}>
      {label}
    </MuiLink>
  );
};

export default Link;
