import { checkNullish, translate } from 'src/core/helpers/utils';

import { VoteInfoProps } from './index.types';

const VoteInfo: React.FC<VoteInfoProps> = ({ estimatedMatch, impactPoints, totalContribution }) => {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {checkNullish(impactPoints) && (
        <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
          {translate('vote-donate.impact-points')}
          <span className="text-base font-medium leading-6 text-Gray-light-mode-900">
            {impactPoints} {translate('vote-donate.pts')}
          </span>
        </div>
      )}
      {checkNullish(estimatedMatch) && (
        <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
          {translate('vote-donate.estimated-match')}
          <span
            className={`${totalContribution ? 'text-base font-medium leading-6' : 'text-2xl font-semibold leading-8'} text-Gray-light-mode-900`}
          >
            {estimatedMatch}
          </span>
        </div>
      )}
      {checkNullish(totalContribution) && (
        <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
          {translate('vote-donate.total-contribution')}
          <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{totalContribution}</span>
        </div>
      )}
    </div>
  );
};

export default VoteInfo;
