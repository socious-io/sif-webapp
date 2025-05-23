import { config } from 'src/config';

import { CityRes, LocationRes } from './index.types';
import { get } from '../http';
const overwrittenConfig = {
  baseURL: config.sociousWorkBaseURL,
  withCredentials: false,
};

export async function cities(countryCode: string): Promise<CityRes> {
  return (await get<CityRes>(`/geo/locations/country/${countryCode}?limit=301000`, overwrittenConfig)).data;
}

export async function searchLocation(search: string, limit = 20): Promise<LocationRes> {
  return (await get<LocationRes>(`/geo/locations?search=${search}&limit=${limit}&page=1`, overwrittenConfig)).data;
}
