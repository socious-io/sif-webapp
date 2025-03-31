import { RoundStats } from 'src/core/adaptors';

export interface VoteDetailCardProps {
  roundStats: RoundStats;
  isOwner?: boolean;
  alreadyVoted?: boolean;
  voteEnded?: boolean;
  onVote?: () => void;
}
