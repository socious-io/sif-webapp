import { RoundStats } from 'src/core/adaptors';
import { DateRangeStatus } from 'src/core/helpers/date-converter';

export interface VoteDetailCardProps {
  roundStats: RoundStats;
  isOwner?: boolean;
  alreadyVoted?: boolean;
  roundStatus?: DateRangeStatus;
  onVote?: () => void;
  votingStartAt: Date;
}
