import { VoteInfoProps } from './index.types';

const VoteInfo: React.FC<VoteInfoProps> = ({ estimatedMatch, impactPoints, totalContribution }) => {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {impactPoints && (
        <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
          Your impact points
          <span className="text-base font-medium leading-6 text-Gray-light-mode-900">{impactPoints} pts</span>
        </div>
      )}
      <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
        Estimated match
        <span
          className={`${totalContribution ? 'text-base font-medium leading-6' : 'text-2xl font-semibold leading-8'} text-Gray-light-mode-900`}
        >
          {estimatedMatch}
        </span>
      </div>
      {totalContribution && (
        <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
          Total contribution
          <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{estimatedMatch}</span>
        </div>
      )}
    </div>
  );
};

export default VoteInfo;
