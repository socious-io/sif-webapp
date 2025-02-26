import { ReactNode } from 'react';

export type VerticalTabsItem = {
  label: ReactNode;
  content: ReactNode;
};

export interface VerticalTabsProps {
  tabs: VerticalTabsItem[];
  activeIndex?: number;
  onActiveIndex?: (index: number) => void;
  containerCustomStyle?: string;
}
