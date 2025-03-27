import { RoundStats } from 'src/core/adaptors';

export interface VoteDetailCardProps {
  roundStats: RoundStats;
  isOwner?: boolean;
  alreadyVoted?: boolean;
  onShare?: () => void;
  onVote?: () => void;
}
