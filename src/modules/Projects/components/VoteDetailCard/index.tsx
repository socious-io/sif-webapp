import { DateRangeStatus } from 'src/core/helpers/date-converter';
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
  identityType,
  onVote,
  roundStatus,
  votingStartAt,
}) => {
  const { donations, votes } = roundStats || {};
  const { isShared, handleCopy } = useVoteDetailCard();
  return (
    <div className="w-full md:w-[22.5rem] flex flex-col items-stretch gap-4 p-6 bg-Gray-light-mode-50 rounded-xl">
      {/* <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">
          ${estimatedMatch.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
        {translate('projects-round-stats.estimated-match')}
      </div> */}
      {isOwner ? (
        <>
          <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
            <div>
              {Object.entries(donations).map(([currency, amount]) => (
                <div key={currency} className="flex flex-row justify-between">
                  <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">{currency}</span>
                  <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">
                    ${donations[currency].toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
            {translate('projects-round-stats.donated')}
          </div>
          <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
            <span className="text-3xl font-semibold leading-8 text-Gray-light-mode-900">{votes}</span>
            {translate('projects-round-stats.votes')}
          </div>
        </>
      ) : (
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
          <>
            <Button color="primary" onClick={onVote} disabled={identityType === 'organizations'}>
              {alreadyVoted || roundStatus !== DateRangeStatus.DURING
                ? translate('vote-donate.donate-now-btn')
                : translate('projects-round-stats.vote-button')}
            </Button>
            {identityType === 'organizations' && (
              <AlertMessage theme="warning" iconName="alert-circle" title={translate('vote-donate.strict-org')} />
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default VoteDetailCard;
