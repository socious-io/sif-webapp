import { IdentityType } from 'src/core/api';

import { PaginateRes } from '..';

export type RoundStats = {
  estimatedMatch: number;
  donatedAmount: number;
  votes: number;
};

export interface Project {
  id: string;
  coverImg: string;
  category: string;
  title: string;
  description: string;
  creator: { id?: string; type: IdentityType; name: string; username?: string; img: string };
  website?: string;
  location?: string;
  overview?: string;
  roundStats?: RoundStats;
}

export type ProjectRes = PaginateRes<Project>;
