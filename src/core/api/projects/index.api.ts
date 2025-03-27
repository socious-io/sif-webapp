import { get, post, patch } from '../http';
import { FilterReq, PaginateReq } from '../types';
import { DonationReq, Project, ProjectsRes } from './index.types';

export async function getProjects(params: PaginateReq, filters?: FilterReq): Promise<ProjectsRes> {
  return (await get<ProjectsRes>('projects', { params }, filters)).data;
}

export async function getProject(id: string): Promise<Project> {
  return (await get<Project>(`projects/${id}`)).data;
}

export async function vote(id: string): Promise<any> {
  return (await post<any>(`projects/${id}/votes`, {})).data;
}

export async function donate(id: string, payload: DonationReq): Promise<any> {
  return (await post<any>(`projects/${id}/donates`, payload)).data;
}

export async function createProjects(payload: Partial<Project>): Promise<any> {
  return (await post<any>('projects', payload)).data;
}

export async function editProjects(id: string, payload: Partial<Project>): Promise<any> {
  return (await patch<any>(`projects/${id}`, payload)).data;
}
