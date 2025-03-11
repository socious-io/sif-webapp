import { post, get } from '../http';
import { Auth, AuthReq, AuthSession, AuthSessionReq } from './auth.types';
import { CurrentIdentity } from '../users/index.types';

export async function auth(payload: AuthReq): Promise<Auth> {
  return (await post<Auth>(`auth`, payload)).data;
}

export async function sociousOauth(payload: AuthSessionReq): Promise<AuthSession> {
  return (await post<AuthSession>(`auth/session`, payload)).data;
}
export async function identities(): Promise<CurrentIdentity[]> {
  return (await get<CurrentIdentity[]>('identities')).data;
}
