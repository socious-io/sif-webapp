import { useEffect, useState } from 'react';

import styles from './index.module.scss';
import { HorizontalTabsProps } from './index.types';

const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  leftAligned = true,
  activeIndex = 0,
  onActiveIndex,
  onChangeTab,
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
    if (onChangeTab) {
      onChangeTab(tabs[index]);
    }
  };

  return (
    <div className={`${styles['container']} ${containerCustomStyle}`}>
      <div className={styles['tabs']}>
        {tabs.map((tab, index) => (
          <div
            key={`${tab.label}-${index.toString()}`}
            className={`${styles['tab']} ${index === active && styles['tab--active']} ${!leftAligned && 'flex-1'}`}
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

export default HorizontalTabs;
