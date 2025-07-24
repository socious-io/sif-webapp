import { RoundStats } from 'src/core/adaptors';
import { DateRangeStatus } from 'src/core/helpers/date-converter';

export interface VoteDetailCardProps {
  roundStats: RoundStats;
  isOwner?: boolean;
  alreadyVoted?: boolean;
  identityType?: 'users' | 'organizations';
  onVote?: () => void;
  roundStatus?: DateRangeStatus;
  votingStartAt?: Date;
}
