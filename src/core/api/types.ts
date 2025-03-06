export interface SuccessRes {
  message: string;
}

export interface PaginateReq {
  page?: number;
  limit?: number;
}
export interface PaginateRes<T> {
  page: number;
  limit: number;
  total: number;
  results: T[];
}
export interface FilterReq extends PaginateReq {
  [key: string]: any;
}
