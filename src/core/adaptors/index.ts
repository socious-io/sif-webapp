export * from './media/index.adaptors';
export * from './media/index.types';

export * from './projects/index.adaptors';
export * from './projects/index.types';

export * from './auth/index.adaptors';
export * from './auth/index.types';

export * from './verification/index.adaptors';

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
