import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Breadcrumbs from 'src/modules/General/components/Breadcrumbs';
import Chip from 'src/modules/General/components/Chip';
import ProjectsList from 'src/modules/Projects/containers/ProjectsList';

export const Projects = () => {
  //FIXME: not static
  const roundIsClosed = false;

  const breadcrumbs = [
    {
      iconName: 'home-line',
      label: '',
      link: '/',
    },
    {
      label: translate('projects-breadcrumb-explore'),
      link: '/projects',
    },
    {
      label: translate('projects-breadcrumb-round', { count: 1 }),
    },
  ];

  return (
    <>
      <img src="/images/explorer-cover.png" alt="Explorer Cover" width="100%" height="100%" />
      <div className="flex flex-col items-stretch gap-6 px-4 py-5 md:p-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col items-start gap-1">
            {roundIsClosed && <Chip theme="warning" label={translate('home-round-closed')} />}
            <span className="text-2xl md:text-3xl font-semibold">
              {translate('home-round', { count: 1, name: 'Empowering Change Makers' })}
            </span>
          </div>
          {!roundIsClosed && (
            <div className="flex items-center gap-4 text-sm text-Gray-light-mode-600">
              <span>
                {translate('home-starts')} <br className="md:hidden" /> 2024/01/15 00:00 UTC
              </span>
              <span>
                {translate('home-ends')} <br className="md:hidden" /> 2024/01/29 00:00 UTC
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
