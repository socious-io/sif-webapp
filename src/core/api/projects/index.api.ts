import { FilterReq, PaginateReq, SuccessRes } from '..';
import { get, post, patch, del } from '../http';
import { CommentReq, CommentsRes, DonationReq, Project, ProjectsRes, Comment } from './index.types';

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
export async function removeProjects(id: string): Promise<SuccessRes> {
  return (await del<any>(`projects/${id}`)).data;
}

export async function editProjects(id: string, payload: Partial<Project>): Promise<any> {
  return (await patch<any>(`projects/${id}`, payload)).data;
}

export async function getComments(projectId: string, params?: PaginateReq): Promise<CommentsRes> {
  return (await get<CommentsRes>(`projects/${projectId}/comments`, { params })).data;
}

export async function addComment(projectId: string, payload: CommentReq): Promise<Comment> {
  return (await post<Comment>(`projects/${projectId}/comments`, payload)).data;
}

export async function reactProjectComment(commentId: string, reaction: string): Promise<CommentsRes> {
  return (await post<CommentsRes>(`projects/comments/${commentId}/reactions`, { reaction })).data;
}

export async function unreactProjectComment(commentId: string): Promise<CommentsRes> {
  return (await del<CommentsRes>(`projects/comments/${commentId}/reactions`)).data;
}
