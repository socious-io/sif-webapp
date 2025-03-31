import styles from './index.module.scss';
import { FeaturedIconOutlinedProps } from './index.type';
import Icon from '../Icon';

const FeaturedIconOutlined: React.FC<FeaturedIconOutlinedProps> = ({ iconName, size, theme, customStyle = '' }) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : size === 'lg' ? 24 : 28;
  return (
    <div className={`${styles['outline']} ${styles[`outer-${size}`]} ${styles[`${theme}-outer`]} ${customStyle}`}>
      <div className={`${styles['outline']} ${styles[`inner-${size}`]} ${styles[`${theme}-inner`]}`}>
        <Icon name={iconName} fontSize={iconSize} className={`${styles[`icon-color-${theme}`]}`} />
      </div>
    </div>
  );
};

export default FeaturedIconOutlined;
