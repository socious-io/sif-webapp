import { DateRangeStatus } from 'src/core/helpers/date-converter';
import { formatVotingStartMessage } from 'src/core/helpers/date-helpers';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import { VoteDetailCardProps } from './index.types';
import { useVoteDetailCard } from './useVoteDetailCard';

const VoteDetailCard: React.FC<VoteDetailCardProps> = ({
  roundStats,
  isOwner = false,
  alreadyVoted = false,
  roundStatus = DateRangeStatus.AFTER,
  votingStartAt,
  onVote,
  showResult = true,
  identityType,
}) => {
  const { donatedAmount, votes } = roundStats || {};
  const { isShared, handleCopy } = useVoteDetailCard();
  return (
    <div className="w-full md:w-[22.5rem] flex flex-col items-stretch gap-4 p-6 bg-Gray-light-mode-50 rounded-xl">
      {/* <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">
          ${estimatedMatch.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        {translate('projects-round-stats.estimated-match')}
      </div> */}
      {showResult && (
        <>
          <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
            <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">
              ${(donatedAmount.USD || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {translate('projects-round-stats.donated')}
          </div>
          <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
            <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">{votes}</span>
            {translate('projects-round-stats.votes')}
          </div>
        </>
      )}
      {!isOwner && (
        <div className="flex flex-col gap-3 mt-4">
          <Button
            color="info"
            startIcon={<Icon name="share-02" fontSize={20} color={variables.color_grey_900} />}
            customStyle="!text-Gray-light-mode-900"
            onClick={handleCopy}
            disabled={isShared}
          >
            {isShared ? translate('projects-round-stats.link-copied') : translate('projects-round-stats.share-button')}
          </Button>
          {
            <>
              {roundStatus !== DateRangeStatus.DURING || alreadyVoted ? (
                <AlertMessage
                  theme="warning"
                  iconName="alert-circle"
                  title={
                    roundStatus === DateRangeStatus.AFTER
                      ? translate('vote-donate.end-voted')
                      : roundStatus === DateRangeStatus.BEFORE
                        ? `${translate('vote-donate.not-started')} ${formatVotingStartMessage(votingStartAt as Date)}`
                        : translate('vote-donate.already-voted')
                  }
                />
              ) : (
                <>
                  <Button color="primary" onClick={onVote} disabled={identityType === 'organizations'}>
                    {translate('projects-round-stats.vote-button')}
                  </Button>
                  {identityType === 'organizations' && (
                    <AlertMessage theme="warning" iconName="alert-circle" title={translate('vote-donate.strict-org')} />
                  )}
                </>
              )}
            </>
          }
        </div>
      )}
    </div>
  );
};

export default VoteDetailCard;
