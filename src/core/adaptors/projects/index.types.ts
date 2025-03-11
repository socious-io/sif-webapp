import { IdentityType } from 'src/core/api';

import { PaginateRes } from '..';

export type RoundStats = {
  estimatedMatch: number;
  donatedAmount: number;
  votes: number;
};

export interface Donation {
  id: string;
  donated_identity: { name: string };
  donated_price: string;
  date: string;
}

export interface Project {
  id: string;
  coverImg: string;
  category: string;
  title: string;
  description: string;
  creator: { id?: string; type: IdentityType; name: string; username?: string; img: string };
  website?: string;
  location?: string;
  overview?: JSX.Element;
  roundStats?: RoundStats;
  donations?: Donation[];
}

export type ProjectRes = PaginateRes<Project>;

export type DonateReq = {
  donate: string;
  currency: string;
  preventDisplayName: boolean;
};
