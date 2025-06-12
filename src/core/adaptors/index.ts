import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';

import { translate } from '../helpers/utils';

export * from './media/index.adaptors';
export * from './media/index.types';

export * from './projects/index.adaptors';
export * from './projects/index.types';

export * from './auth/index.adaptors';
export * from './auth/index.types';

export * from './users/index.adaptors';
export * from './users/index.types';

export interface SuccessRes {
  message?: string;
}

export type AdaptorRes<T = null> = {
  data: T | null;
  error: string | null;
};

export interface PaginateRes<T> {
  page: number;
  limit: number;
  total: number;
  items: T[];
}

export interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

export function socialCausesToCategoryAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => value);
}
export function socialCausesToCategory(categories: string[] = []) {
  if (!categories) {
    return [];
  }
  return categories.map(cat => {
    return { label: translate(cat), value: cat };
  });
}
