export * from './users/index.types';

export * from './media/index.api';
export * from './media/index.types';

export * from './projects/index.api';
export * from './projects/index.types';

export * from './auth/auth.api';
export * from './auth/auth.types';

export * from './geo/index.api';
export * from './geo/index.types';

export interface PaginateReq {
  page?: number;
  limit?: number;
}

export interface FilterReq extends PaginateReq {
  [key: string]: any;
}

export interface SuccessRes {
  message: string;
}

export interface PaginateRes {
  page: number;
  limit: number;
  total_count: number;
  items: any[];
}

export interface PaginateResV3<T> {
  page: number;
  limit: number;
  total: number;
  results: T[];
}
