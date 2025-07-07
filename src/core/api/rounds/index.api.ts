import { get } from '../http';
import { Round } from './index.types';

export async function getRound(): Promise<Round> {
  return (await get<Round>('rounds')).data;
}
