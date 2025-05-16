import { ReactNode } from 'react';

export type HorizontalTabsItem = {
  label: ReactNode;
  content: ReactNode;
};

export interface HorizontalTabsProps {
  tabs: HorizontalTabsItem[];
  leftAligned?: boolean;
  activeIndex?: number;
  onActiveIndex?: (index: number) => void;
  onChangeTab?: (tab: HorizontalTabsItem) => void;
  containerCustomStyle?: string;
}
