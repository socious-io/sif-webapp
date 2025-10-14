import { UTxO } from '@meshsdk/core';
import axios from 'axios';
import { config } from 'src/config';

export async function fetchUtxos(defaultAddress: string): Promise<UTxO[]> {
  const network = config.env === 'production' ? 'mainnet' : 'preprod';
  const url = `https://cardano-${network}.blockfrost.io/api/v0/addresses/${defaultAddress}/utxos`;
  return (await axios.get<UTxO[]>(url, { headers: { project_id: config.blockfrostProjectId } })).data;
}
