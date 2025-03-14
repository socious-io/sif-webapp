import { get } from '../http';

export async function getRounds(): Promise<any> {
  return (await get<any>(`rounds`)).data;
}
