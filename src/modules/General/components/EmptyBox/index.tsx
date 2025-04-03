import Button from 'src/modules/General/components/Button';

import styles from './index.module.scss';
import { EmptyBoxProps } from './index.types';

const EmptyBox: React.FC<EmptyBoxProps> = ({ icon, title, subtitle = '', button }) => {
  return (
    <div className={styles['container']}>
      {icon}
      <div className={styles['content']}>
        {title}
        {subtitle && <span className={styles['content__subtitle']}>{subtitle}</span>}
      </div>
      {button && <Button {...button} />}
    </div>
  );
};

export default EmptyBox;
