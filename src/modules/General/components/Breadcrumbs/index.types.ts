import { BreadcrumbsProps as MUIBreadcrumbProps } from '@mui/material';

export type BreadcrumbItem =
  | {
      label: string;
      link?: string;
      iconName?: string;
    }
  | {
      label: string;
      options: { label: string; value: string }[];
      onChange?: (value) => void;
      defaultValue: { label: string; value: string };
    };

export interface BreadcrumbsProps extends MUIBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}
