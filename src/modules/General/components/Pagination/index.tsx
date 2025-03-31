import { Pagination as MUIPagination, PaginationItem, PaginationProps } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import Icon from '../Icon';

const Pagination: React.FC<PaginationProps> = props => {
  return (
    <div className={styles['container']}>
      <MUIPagination
        {...props}
        shape="rounded"
        renderItem={item => {
          if (item.type === 'previous') {
            return (
              <PaginationItem
                {...item}
                slots={{
                  previous: () => (
                    <div className={styles['button']}>
                      <Icon name="arrow-left" fontSize={20} color={variables.color_grey_800} className="mr-2" />
                      {translate('general-pagination.prev')}
                    </div>
                  ),
                }}
              />
            );
          }
          return null;
        }}
      />

      <div className={styles['numbers']}>
        <MUIPagination
          shape="rounded"
          renderItem={item => (
            <PaginationItem
              {...item}
              slots={{
                previous: () => null,
                next: () => null,
              }}
            />
          )}
          {...props}
        />
      </div>

      <MUIPagination
        {...props}
        shape="rounded"
        renderItem={item => {
          if (item.type === 'next') {
            return (
              <PaginationItem
                {...item}
                slots={{
                  next: () => (
                    <div className={styles['button']}>
                      {translate('general-pagination.next')}
                      <Icon name="arrow-right" fontSize={20} color={variables.color_grey_800} className="ml-2" />
                    </div>
                  ),
                }}
              />
            );
          }
          return null;
        }}
      />
    </div>
  );
};

export default Pagination;
