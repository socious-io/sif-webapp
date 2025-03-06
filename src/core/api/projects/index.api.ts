import { get, post } from '../http';
import { FilterReq, PaginateReq } from '../types';
import { Project, ProjectsRes } from './index.types';

export async function getProjects(params: PaginateReq, filters?: FilterReq): Promise<ProjectsRes> {
  return (await get<ProjectsRes>('projects', { params }, filters)).data;
}

export async function getProject(id: string): Promise<Project> {
  return (await get<Project>(`projects/${id}`)).data;
}

export async function vote(id: string): Promise<any> {
  return (await post<any>(`projects/${id}/vote`, {})).data;
}

export async function donate(id: string, payload: any): Promise<any> {
  return (await post<any>(`projects/${id}/donate`, payload)).data;
}
