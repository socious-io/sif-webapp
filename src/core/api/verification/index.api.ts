import { get, post } from '../http';
import { KYBReq, KYBRes } from './index.types';

export async function requestKYB(id: string, payload: KYBReq): Promise<KYBRes> {
  return (await post<KYBRes>('kybs', payload)).data;
}

export async function getKYB(id: string): Promise<KYBRes> {
  return (await get<KYBRes>('kybs')).data;
}
