import { useNavigate } from 'react-router-dom';
import AvatarGroup from 'src/assets/images/sample-avatars/Avatar-group.png';
import { convertDateFormat, getDaysUntil } from 'src/core/helpers/date-converter';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Chip from 'src/modules/General/components/Chip';

import { useHome } from './useHome';

export const Home = () => {
  const navigate = useNavigate();
  const { round, isIdentityUser, roundIsClosed } = useHome();

  return (
    <>
      <div className="flex flex-col items-center md:px-[7rem] md:pt-8 md:pb-[6rem] relative bg-Gray-light-mode-50">
        <div className="w-full flex flex-col items-center gap-6 px-4 py-16 md:p-[6rem] bg-Brand-800 shadow-lg md:rounded-3xl text-xl font-normal leading-8 text-Brand-200 text-center">
          <div className="flex flex-col items-center text-4xl md:text-7xl font-semibold leading-[44px] md:leading-[90px] text-Base-White">
            {translate('home-header-1')}
            <span className="text-Brand-200">{translate('home-header-2')}</span>
          </div>
          {translate('home-subheader')}
          <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 mt-6 mb-8">
            <Button
              color="info"
              customStyle="!h-[3.75rem] min-w-[9.25rem] !p-3 md:!p-4 !text-Gray-light-mode-700"
              href="https://socious.org"
            >
              {translate('home-learn-more-button')}
            </Button>
            <Button
              color="primary"
              customStyle="!h-[3.75rem] md:min-w-[9.25rem] !p-3 md:!p-4"
              onClick={() => navigate('/projects')}
            >
              {translate('home-explore-button')}
            </Button>
          </div>
        </div>
        <img src="/images/line-pattern.png" className="absolute bottom-[4.25rem] left-0 hidden md:block" />
        <div className="max-w-full md:max-w-[60rem] flex flex-col mx-4 bg-Base-White shadow-md rounded-xl overflow-hidden absolute top-[calc(100%-2rem)] md:top-[calc(100%-9.75rem)]">
          <img src={round?.cover || '/images/explorer-cover.png'} alt="Explorer" />
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <div className="flex flex-col items-start gap-1">
              {roundIsClosed && <Chip theme="warning" label={translate('home-round-closed')} />}
              <span className="text-2xl md:text-3xl font-semibold">{round?.name || 'N/A'}</span>
            </div>
            {round &&
              !roundIsClosed &&
              (isIdentityUser ? (
                <div className="flex flex-col gap-3 md:gap-1">
                  <div className="text-sm text-Gray-light-mode-600">
                    <span className="font-medium text-Gray-light-mode-700">{translate('home-proposal')}</span>
                    <br className="md:hidden" />
                    {convertDateFormat(round.submission_start_at)} - {convertDateFormat(round.submission_end_at)}
                  </div>
                  <div className="text-sm text-Gray-light-mode-600">
                    <span className="font-medium text-Gray-light-mode-700">{translate('home-vote-period')}</span>
                    <br className="md:hidden" />
                    {convertDateFormat(round.voting_start_at)} - {convertDateFormat(round.voting_end_at)}
                  </div>
                  <div className="text-sm text-Gray-light-mode-600">
                    <span className="font-medium text-Gray-light-mode-700">{translate('home-vote-results')}</span>
                    <br className="md:hidden" />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4 text-sm text-Gray-light-mode-600 mt-[-0.5rem]">
                  <span>
                    {translate('home-starts')} {convertDateFormat(round.voting_start_at)}
                  </span>
                  <span>
                    {translate('home-ends')} {convertDateFormat(round.voting_end_at)}
                  </span>
                </div>
              ))}
            <p className="mt-2 leading-6 text-Gray-light-mode-600">
              {translate('home-thanks', { amount: round?.pool_amount })}
            </p>
            <div className="flex flex-col items-stretch md:flex-row md:items-center gap-4 pt-2 md:py-4">
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">{round?.total_projects}</span>
                {translate('home-projects')}
              </div>
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">
                  {getDaysUntil(round?.submission_end_at as string) > 0
                    ? getDaysUntil(round?.submission_end_at as string)
                    : 0}
                </span>
                {translate('home-days-left-to-submit')}
              </div>
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">
                  {getDaysUntil(round?.voting_end_at as string) > 0 ? getDaysUntil(round?.voting_end_at as string) : 0}
                </span>
                {translate('home-days-left-to-vote')}
              </div>
              <div className="flex-1 flex flex-col gap-1 text-sm text-Gray-light-mode-600">
                <span className="text-4xl md:text-5xl font-semibold text-Brand-700">
                  ${new Intl.NumberFormat('en-US').format(round?.pool_amount || 0)}
                </span>
                {translate('home-matching-pool')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col items-stretch gap-12 md:gap-16 ${
          isIdentityUser ? 'mt-[50rem] md:mt-[31.5rem]' : 'mt-[44rem] md:mt-[28.5rem]'
        } px-4 py-[7rem] md:px-[5rem] md:pt-[6rem] md:pb-[10rem]`}
      >
        <div className="md:max-w-[60rem] md:px-[6rem] self-center flex flex-col gap-2 leading-6 text-Gray-light-mode-600">
          <span className="text-lg font-medium text-Gray-light-mode-900">{translate('home-about-title')}</span>
          <p>{translate('home-about-description-1')}</p>
          <p>{translate('home-about-description-2')}</p>
        </div>
        <div className="flex flex-col items-center gap-8 md:mx-8 p-8 bg-Gray-light-mode-50 border-4 rounded-2xl">
          <img src={AvatarGroup} alt="support" width={120} height={56} />
          <div className="flex flex-col items-center gap-2 text-lg text-Gray-light-mode-600">
            <span className="text-xl font-semibold leading-8 text-Gray-light-mode-900">
              {translate('home-contact-title')}
            </span>
            {translate('home-contact-subtitle')}
          </div>
          <Button
            component="a"
            href="https://socious.io/contact"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
          >
            {translate('home-contact-button')}
          </Button>
        </div>
      </div>
    </>
  );
};
