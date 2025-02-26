import { Chip, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import variables from 'src/styles/constants/_exports.module.scss';

import Icon from '../Icon';
import styles from './index.module.scss';
import { BreadcrumbsProps } from './index.types';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '', ...props }) => {
  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      separator={<Icon name="chevron-right" fontSize={16} color={variables.color_grey_300} />}
      className={`${styles['container']} ${className}`}
      {...props}
    >
      {items.map(item =>
        item.link ? (
          <Link key={item.label} to={item.link} className={styles['link']}>
            {item.iconName && (
              <Icon name={item.iconName} fontSize={20} color={variables.color_grey_500} cursor="pointer" />
            )}
            {item.label}
          </Link>
        ) : (
          <Chip key={item.label} label={item.label} className={styles['chip']} />
        ),
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
