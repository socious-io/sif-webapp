import { Chip, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import variables from 'src/styles/constants/_exports.module.scss';

import Icon from '../Icon';
import styles from './index.module.scss';
import { BreadcrumbsProps } from './index.types';
import SearchDropdown from '../SearchDropdown';

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '', ...props }) => {
  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string } | null>(null);
  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      separator={<Icon name="chevron-right" fontSize={16} color={variables.color_grey_300} />}
      className={`${styles['container']} ${className}`}
      {...props}
    >
      {items.map((item, index) => {
        if ('options' in item && Array.isArray(item.options)) {
          return (
            <SearchDropdown
              key={item.label + index}
              border={false}
              options={item.options}
              hasDropdownIcon
              value={selectedOption || item.defaultValue}
              onChange={selected => {
                item.onChange && item.onChange(selected);
                setSelectedOption(selected as { value: string; label: string });
              }}
              controlStyleObject={{ backgroundColor: variables.color_grey_25 }}
              valueStyleObject={{ fontSize: '14ps' }}
            />
          );
        }

        if ('link' in item) {
          return (
            <Link key={item.label + index} to={item.link!} className={styles['link']}>
              {item.iconName && (
                <Icon name={item.iconName} fontSize={20} color={variables.color_grey_500} cursor="pointer" />
              )}
              {item.label}
            </Link>
          );
        }

        return <Chip key={item.label + index} label={item.label} className={styles['chip']} />;
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
