import Button from 'src/modules/General/components/Button';
import FeaturedIconOutlined from 'src/modules/General/components/FeaturedIconOutlined';

import styles from './index.module.scss';
import { TopBannerProps } from './index.types';

const TopBanner: React.FC<TopBannerProps> = ({
  theme,
  text,
  supportingText,
  primaryButton,
  secondaryButton,
  customStyle = '',
}) => {
  const icons = {
    warning: 'alert-circle',
    success: 'check-circle',
  };

  return (
    <div className={`${styles['container']} ${styles[`container--${theme}`]} ${customStyle}`}>
      <div className={styles['header']}>
        <FeaturedIconOutlined theme={theme} iconName={icons[theme]} size="md" />
        <div className={styles['texts']}>
          <span className="font-semibold">{text}</span>
          {supportingText}
        </div>
      </div>
      {(primaryButton || secondaryButton) && (
        <div className={styles['buttons']}>
          {secondaryButton && (
            <Button
              variant="text"
              color="inherit"
              customStyle={`${styles['btn']} ${styles[`btn__secondary--${theme}`]}`}
              target="_blank"
              {...secondaryButton}
            />
          )}
          {primaryButton && (
            <Button
              variant="text"
              color="inherit"
              customStyle={`${styles['btn']} ${styles[`btn__primary--${theme}`]}`}
              {...primaryButton}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TopBanner;
