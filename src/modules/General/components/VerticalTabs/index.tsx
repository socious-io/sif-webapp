import { useEffect, useState } from 'react';

import styles from './index.module.scss';
import { VerticalTabsProps } from './index.types';

const VerticalTabs: React.FC<VerticalTabsProps> = ({
  tabs,
  activeIndex = 0,
  onActiveIndex,
  containerCustomStyle = '',
}) => {
  const [active, setActive] = useState(activeIndex);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    if (onActiveIndex) {
      onActiveIndex(index);
    } else {
      setActive(index);
    }
  };

  return (
    <div className={`${styles['container']} ${containerCustomStyle}`}>
      <div className={styles['tabs']}>
        {tabs.map((tab, index) => (
          <div
            key={`${tab.label}-${index.toString()}`}
            className={`${styles['tab']} ${index === active && styles['tab--active']}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="w-full h-full">{tabs[active]?.content}</div>
    </div>
  );
};

export default VerticalTabs;
