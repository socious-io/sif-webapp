import { post, get } from '../http';
import { Auth, AuthReq, AuthSession, AuthSessionReq, RefreshReq, RefreshRes } from './auth.types';
import { IdentitiesRes } from '../users/index.types';

export async function auth(payload: AuthReq): Promise<Auth> {
  return (await post<Auth>(`auth`, payload)).data;
}

export async function sociousOauth(payload: AuthSessionReq): Promise<AuthSession> {
  return (await post<AuthSession>(`auth/session`, payload)).data;
}
export async function identities(): Promise<IdentitiesRes> {
  return (await get<IdentitiesRes>('identities')).data;
}

export async function refresh(payload: RefreshReq): Promise<RefreshRes> {
  return (await post<RefreshRes>('auth/refresh', payload)).data;
}
