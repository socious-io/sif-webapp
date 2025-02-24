import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import { VoteDetailCardProps } from './index.types';

const VoteDetailCard: React.FC<VoteDetailCardProps> = ({ roundStats, isOwner = false, onShare, onVote }) => {
  const { estimatedMatch, donatedAmount, votes } = roundStats || {};

  return (
    <div className="w-full md:w-[22.5rem] flex flex-col items-stretch gap-4 p-6 bg-Gray-light-mode-50 rounded-xl">
      <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">
          ${estimatedMatch.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        estimated match in current round
      </div>
      <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">
          ${donatedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        donated
      </div>
      <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">{votes}</span>
        votes
      </div>
      {!isOwner && (
        <div className="flex flex-col gap-3 mt-4">
          <Button
            color="info"
            startIcon={<Icon name="share-02" fontSize={20} color={variables.color_grey_900} />}
            customStyle="!text-Gray-light-mode-900"
            onClick={onShare}
          >
            Share
          </Button>
          <Button color="primary" onClick={onVote}>
            Vote now
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoteDetailCard;
