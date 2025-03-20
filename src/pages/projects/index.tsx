import { Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { convertDateFormat, getDaysUntil } from 'src/core/helpers/date-converter';
import { translate } from 'src/core/helpers/utils';
import Breadcrumbs from 'src/modules/General/components/Breadcrumbs';
import Chip from 'src/modules/General/components/Chip';
import ProjectsList from 'src/modules/Projects/containers/ProjectsList';
import { RootState } from 'src/store';

export const Projects = () => {
  const round = useSelector((state: RootState) => state.round.round);

  const roundIsClosed = getDaysUntil(round?.voting_end_at as string) <= 0;

  const breadcrumbs = [
    { iconName: 'home-line', label: '', link: '/' },
    { label: translate('projects-breadcrumb-explore'), link: '/projects' },
    { label: round?.name },
  ];

  return (
    <>
      <img src="/images/explorer-cover.png" alt="Explorer Cover" width="100%" height="100%" />
      <div className="container flex flex-col items-stretch gap-6 px-4 py-5 md:p-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-1">
            {roundIsClosed && <Chip theme="warning" label={translate('home-round-closed')} />}
            <span className="text-2xl md:text-3xl font-semibold">{round?.name}</span>
          </div>
          {!roundIsClosed && (
            <div className="flex items-center gap-4 text-sm text-Gray-light-mode-600">
              <span>
                {translate('home-starts')} <br className="md:hidden" />
                {round && convertDateFormat(round.voting_start_at)}
              </span>
              <span>
                {translate('home-ends')} <br className="md:hidden" /> {round && convertDateFormat(round.voting_end_at)}
              </span>
            </div>
          )}
        </div>
        <Divider />
        <ProjectsList />
      </div>
    </>
  );
};
