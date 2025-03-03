import { ReactNode } from 'react';

export interface CardRadioButtonProps {
  items: CardRadioButtonItem[];
  selectedValue?: string;
  setSelectedValue: (value: string) => void;
  direction?: 'row' | 'col';
  customStyle?: string;
  containerClassName?: string;
  titleClassName?: string;
}

export type CardRadioButtonItem = {
  id: string;
  value: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  disabled?: boolean;
  radioSize?: 'small' | 'medium';
};
