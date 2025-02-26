import { BreadcrumbsProps as MUIBreadcrumbProps } from '@mui/material';

export type BreadcrumbItem = {
  label: string;
  link?: string;
  iconName?: string;
};

export interface BreadcrumbsProps extends MUIBreadcrumbProps {
  items: BreadcrumbItem[];
}
