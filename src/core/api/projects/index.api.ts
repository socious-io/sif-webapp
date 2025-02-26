import { get } from '../http';
import { FilterReq, PaginateReq } from '../types';

export async function getProjects(params: PaginateReq, filters?: FilterReq): Promise<any> {
  return (await get<any>('projects', { params }, filters)).data;
}

export async function getProject(id: string): Promise<any> {
  return (await get<any>(`projects/${id}`)).data;
}
