import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { PaginationMobileProps } from './index.types';
import Icon from '../Icon';

const PaginationMobile: React.FC<PaginationMobileProps> = ({ page, handleChange, count }) => {
  return (
    <div className={styles['container']}>
      <button
        className={`${styles['button']} ${styles['button__left']}`}
        onClick={() => handleChange(page - 1)}
        disabled={page === 1}
      >
        <Icon name="arrow-left" fontSize={20} color={variables.color_grey_700} cursor="pointer" />
      </button>
      <span className={styles['page']}>{`page ${page} of ${count}`}</span>
      <button
        className={`${styles['button']} ${styles['button__right']}`}
        onClick={() => handleChange(page + 1)}
        disabled={page === count}
      >
        <Icon name="arrow-right" fontSize={20} color={variables.color_grey_700} cursor="pointer" />
      </button>
    </div>
  );
};

export default PaginationMobile;
