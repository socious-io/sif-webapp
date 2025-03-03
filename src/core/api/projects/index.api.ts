import { get, post } from '../http';
import { FilterReq, PaginateReq } from '../types';

export async function getProjects(params: PaginateReq, filters?: FilterReq): Promise<any> {
  return (await get<any>('projects', { params }, filters)).data;
}

export async function getProject(id: string): Promise<any> {
  return (await get<any>(`projects/${id}`)).data;
}

export async function vote(id: string): Promise<any> {
  return (await post<any>(`projects/${id}/vote`, {})).data;
}

export async function donate(id: string, payload: any): Promise<any> {
  return (await post<any>(`projects/${id}/donate`, payload)).data;
}
