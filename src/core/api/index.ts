export * from './users/index.types';

export * from './media/index.api';
export * from './media/index.types';

export * from './projects/index.api';
export * from './projects/index.types';

export * from './auth/auth.api';
export * from './auth/auth.types';

export * from './verification/index.api';
export * from './verification/index.types';

export * from './geo/index.api';
export * from './geo/index.types';

export * from './rounds/index.api';
export * from './rounds/index.types';

export interface PaginateRes<T> {
  page: number;
  limit: number;
  total: number;
  results: T[];
}
