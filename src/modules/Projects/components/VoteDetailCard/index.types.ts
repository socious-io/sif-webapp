import { RoundStats } from 'src/core/adaptors';

export interface VoteDetailCardProps {
  roundStats: RoundStats;
  isOwner?: boolean;
  alreadyVoted?: boolean;
  identityType?: 'users' | 'organizations';
  onVote?: () => void;
}
