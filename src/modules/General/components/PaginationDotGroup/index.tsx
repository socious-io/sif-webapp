import styles from './index.module.scss';
import { PaginationDotGroupProps } from './index.types';

const PaginationDotGroup: React.FC<PaginationDotGroupProps> = props => {
  const {
    shape = 'oval',
    count,
    transparent = true,
    active = 0,
    size,
    titles = [],
    highlightPrevSteps = false,
    containerClassName = '',
    customStyle = '',
  } = props;
  return (
    <div className={`${styles['container']} ${transparent && 'bg-transparent'} ${containerClassName}`}>
      {[...Array(count)].map((e, n) => (
        <div key={n} className={`${styles['step']} ${styles[`step--${shape}`]} ${customStyle}`}>
          <div
            className={`${styles['indicator']} ${styles[`indicator--${size}`]} ${highlightPrevSteps ? n <= active && styles['indicator--active'] : n === active && styles['indicator--active']}`}
          />
          {titles[n]}
        </div>
      ))}
    </div>
  );
};

export default PaginationDotGroup;
