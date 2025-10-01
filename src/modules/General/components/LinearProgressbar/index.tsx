import styles from './index.module.scss';
import { LinearProgressbarProps } from './index.types';

const LinearProgressbar: React.FC<LinearProgressbarProps> = ({
  value,
  description = '',
  containerClassName = '',
  customStyle = '',
}) => {
  return (
    <div className={`${styles['container']} ${containerClassName}`}>
      <div className={styles['progress']}>
        <div className={`${styles['bar']} ${customStyle}`} style={{ width: `${value}%` }} />
      </div>
      {description && <p className={styles['description']}>{description}</p>}
    </div>
  );
};

export default LinearProgressbar;
