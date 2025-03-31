import { Pagination as MUIPagination, PaginationItem, PaginationProps } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';

const SimplePagination: React.FC<PaginationProps> = props => {
  return (
    <div className={styles['container']}>
      <MUIPagination
        page={props.page}
        shape="rounded"
        sx={{
          '.MuiPagination-ul': {
            display: 'flex',
            listStyleType: 'none',
            padding: 0,
            margin: 0,
          },
          '.MuiPaginationItem-root': {
            color: variables.color_grey_600,
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px',
            borderRadius: '8px',
            border: `1px solid ${variables.color_grey_300}`,
          },
          '.MuiPaginationItem-page, .MuiPaginationItem-ellipsis': {
            display: 'none',
          },
          '.MuiPaginationItem-previous, .MuiPaginationItem-next': {
            margin: '0 4px',
          },
          '.Mui-selected': {
            backgroundColor: variables.color_grey_50,
            color: variables.color_grey_800,
          },
        }}
        renderItem={item => (
          <PaginationItem
            slots={{
              previous: () => <div className={styles['button']}>{translate('general-pagination.prev')}</div>,
              next: () => <div className={styles['button']}>{translate('general-pagination.next')}</div>,
            }}
            {...item}
          />
        )}
        {...props}
      />
      <div className={styles['label']}>
        {translate('general-pagination.page')} {props.page} {translate('general-pagination.of')} {props.count}
      </div>
    </div>
  );
};

export default SimplePagination;
