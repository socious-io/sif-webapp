import { Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import BackLink from 'src/modules/General/components/BackLink';
import Breadcrumbs from 'src/modules/General/components/Breadcrumbs';
import Button from 'src/modules/General/components/Button';
import Chip from 'src/modules/General/components/Chip';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Icon from 'src/modules/General/components/Icon';
import VerticalTabs from 'src/modules/General/components/VerticalTabs';
import VoteDetailCard from 'src/modules/Projects/components/VoteDetailCard';
import DonationsList from 'src/modules/Projects/containers/DonationsList';
import variables from 'src/styles/constants/_exports.module.scss';

import { useProjectDetail } from './useProjectDetail';

export const ProjectDetail = () => {
  const {
    data: { detail, projectId, isOwner, roundIsClosed },
    operations: { navigate, onShare, onEditProject, onVote },
  } = useProjectDetail();

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
      link: '/projects',
    },
    {
      label: detail.title,
      link: `/projects/${projectId}`,
    },
    {
      label: translate('projects-breadcrumb-detail'),
    },
  ];

  const details = [
    {
      label: translate('projects-detail.created-by'),
      content: (
        <AvatarLabelGroup
          avatarSize="3rem"
          account={{ id: '1', name: 'EduWomen Alliance', email: '@EduWomenAlliance', img: '', type: 'users' }}
        />
      ),
    },
    {
      label: translate('projects-detail.round'),
      content: <span className="text-base font-semibold leading-6 text-Brand-600">Empowering Change Makers</span>,
    },
    {
      label: translate('projects-detail.social-causes'),
      content: <span className="text-base font-semibold leading-6 text-Brand-600">{detail.category}</span>,
    },
    {
      label: translate('projects-detail.website'),
      content: (
        <Link to={detail.website || ''} className="text-base font-semibold leading-6 text-Brand-600">
          {detail.website}
        </Link>
      ),
    },
    {
      label: translate('projects-detail.location'),
      content: (
        <div className="flex items-center gap-1.5 text-base font-semibold leading-6 text-Brand-600">
          {detail.location && <Icon name="marker-pin-02" fontSize={20} color={variables.color_grey_400} />}
          {detail.location}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      label: translate('projects-detail.overview'),
      content: (
        <div className="flex flex-col items-stretch gap-8 leading-6 text-Gray-light-mode-600">
          <span className="text-2xl font-semibold leading-8 text-Gray-light-mode-900">
            {translate('projects-detail.overview')}
          </span>
          {detail.overview}
        </div>
      ),
    },
    {
      label: translate('projects-detail.donations'),
      content: (
        <div className="flex flex-col items-stretch gap-8">
          <span className="text-2xl font-semibold leading-8">{translate('projects-detail.donations')}</span>
          <DonationsList />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 py-8 md:p-8">
      <BackLink title="Back" onBack={() => navigate('/projects')} customStyle="md:!hidden !justify-start !p-0" />
      <Breadcrumbs items={breadcrumbs} />
      <img src="/images/explorer-cover.png" alt="Project Cover" width="100%" height="100%" className="rounded-2xl" />
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          {roundIsClosed && <Chip theme="warning" label={translate('home-round-closed')} />}
          <span className="text-2xl md:text-3xl font-medium">{detail.title}</span>
        </div>
        {isOwner && (
          <div className="flex items-stretch gap-3">
            <Button
              color="info"
              startIcon={<Icon name="share-02" fontSize={20} color={variables.color_grey_900} />}
              customStyle="min-w-[6rem] !text-Gray-light-mode-900 break-keep"
              fullWidth
              onClick={onShare}
            >
              {translate('projects-detail.share-button')}
            </Button>
            <Button color="primary" fullWidth customStyle="min-w-[6rem] break-keep" onClick={onEditProject}>
              {translate('projects-detail.edit-button')}
            </Button>
          </div>
        )}
      </div>
      <Divider />
      <div className="flex items-start justify-between gap-12 overflow-x-auto">
        {details.map(detail => (
          <div
            key={detail.label}
            className="flex-1 flex flex-col gap-2 text-sm font-medium leading-5 text-Gray-light-mode-600 text-nowrap"
          >
            {detail.label}
            {detail.content}
          </div>
        ))}
      </div>
      <Divider />
      <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-16">
        <VerticalTabs tabs={tabs} containerCustomStyle="!hidden md:!flex md:!gap-16 md:flex-1" />
        <HorizontalTabs tabs={tabs} containerCustomStyle="md:!hidden" leftAligned={false} />
        {detail.roundStats && (
          <VoteDetailCard roundStats={detail.roundStats} isOwner={isOwner} onShare={onShare} onVote={onVote} />
        )}
      </div>
    </div>
  );
};
