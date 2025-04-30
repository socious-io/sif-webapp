import { Divider } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import BackLink from 'src/modules/General/components/BackLink';
import Breadcrumbs from 'src/modules/General/components/Breadcrumbs';
import Button from 'src/modules/General/components/Button';
import Chip from 'src/modules/General/components/Chip';
import ConfirmModal from 'src/modules/General/components/ConfirmModal';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Icon from 'src/modules/General/components/Icon';
import Link from 'src/modules/General/components/Link';
import VerticalTabs from 'src/modules/General/components/VerticalTabs';
import VoteDetailCard from 'src/modules/Projects/components/VoteDetailCard';
import CommentSection from 'src/modules/Projects/containers/CommentSection';
import variables from 'src/styles/constants/_exports.module.scss';

import { useProjectDetail } from './useProjectDetail';

export const ProjectDetail = () => {
  const {
    data: { detail, projectId, isOwner, roundIsClosed, round, isShared, currentIdentity, openVerifyModal },
    operations: { navigate, onShare, onEditProject, onVote, removeProject, setOpenVerifyModal },
  } = useProjectDetail();
  const breadcrumbs = [
    { iconName: 'home-line', label: '', link: '/' },
    { label: translate('projects-breadcrumb-explore'), link: '/projects' },
    { label: round?.name || '', link: '/projects' },
    { label: detail.title, link: `/projects/${projectId}` },
    { label: translate('projects-breadcrumb-detail') },
  ];

  const details = [
    {
      label: translate('projects-detail.created-by'),
      content: (
        <AvatarLabelGroup
          avatarSize="3rem"
          account={{
            id: detail.creator?.id || '',
            name: detail.creator.name,
            username: detail.creator?.username || '',
            img: detail.creator.img,
            type: detail.creator.type,
          }}
        />
      ),
    },
    {
      label: translate('projects-detail.round'),
      content: <span className="text-base font-semibold leading-6 text-Brand-600">{round?.name}</span>,
    },
    {
      label: translate('projects-detail.social-causes'),
      content: <span className="text-base font-semibold leading-6 text-Brand-600">{detail.category}</span>,
    },
    {
      label: translate('projects-detail.website'),
      content: (
        <Link
          label={detail?.website || ''}
          href={detail.website || ''}
          target="_blank"
          className="text-base font-semibold leading-6 text-Brand-600"
        />
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
    // {
    //   label: translate('projects-detail.donations'),
    //   content: (
    //     <div className="flex flex-col items-stretch gap-8">
    //       <span className="text-2xl font-semibold leading-8">{translate('projects-detail.donations')}</span>
    //       <DonationsList />
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 py-8 md:p-8 container">
      <BackLink title="Back" onBack={() => navigate('/projects')} customStyle="md:!hidden !justify-start !p-0" />
      <Breadcrumbs items={breadcrumbs} />
      <img
        src={detail.coverImg || '/images/explorer-cover.png'}
        alt="Project Cover"
        width="100%"
        height="100%"
        className="rounded-2xl"
      />
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
              customStyle="flex-1 min-w-[10rem] !text-Gray-light-mode-900 break-keep"
              onClick={onShare}
              disabled={isShared}
            >
              {isShared ? translate('projects-detail.link-copied') : translate('projects-detail.share-button')}
            </Button>
            <Button color="primary" fullWidth customStyle="flex-1 min-w-[10rem] break-keep" onClick={onEditProject}>
              {translate('projects-detail.edit-button')}
            </Button>
            <Button
              color="error"
              variant="outlined"
              fullWidth
              customStyle="flex-1 min-w-[10rem] break-keep"
              onClick={() => setOpenVerifyModal(true)}
            >
              {translate('projects-detail.remove-button')}
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
          <VoteDetailCard
            roundStats={detail.roundStats}
            isOwner={isOwner}
            alreadyVoted={detail.voted}
            roundStatus={detail.roundStatus}
            onVote={onVote}
            votingStartAt={round?.voting_start_at}
            showResult={isOwner}
          />
        )}
      </div>
      {projectId && currentIdentity && <CommentSection projectId={projectId} />}
      <ConfirmModal
        open={openVerifyModal}
        handleClose={() => setOpenVerifyModal(false)}
        title={translate('remove-modal.title')}
        confirmHeader={translate('remove-modal.confirmHeader')}
        confirmSubheader={translate('remove-modal.confirmSubheader')}
        buttons={[
          {
            children: translate('remove-modal.buttons.cancel'),
            color: 'info',
            variant: 'outlined',
            onClick: () => setOpenVerifyModal(false),
            customStyle: 'w-full',
          },
          {
            children: translate('remove-modal.buttons.confirm'),
            color: 'error',
            variant: 'contained',
            onClick: removeProject,
            customStyle: 'w-full',
          },
        ]}
        customStyle="md:max-w-[400px]"
      />
    </div>
  );
};
