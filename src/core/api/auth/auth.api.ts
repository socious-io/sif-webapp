import { post } from '../http';
import { Auth, AuthReq, AuthSession, AuthSessionReq } from './auth.types';

export async function auth(payload: AuthReq): Promise<Auth> {
  return (await post<Auth>(`auth`, payload)).data;
}

export async function sociousOauth(payload: AuthSessionReq): Promise<AuthSession> {
  return (await post<AuthSession>(`auth/session`, payload)).data;
}