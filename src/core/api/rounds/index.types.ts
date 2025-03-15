import { get } from '../http';
import { Round } from './index.api';

export async function getRound(): Promise<Round> {
  return (await get<Round>(`rounds`)).data;
}
