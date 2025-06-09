import { Divider } from '@mui/material';
import { categoriesAdaptor } from 'src/constants/PROJECT_CATEGORIES';
import { convertMarkdownToJSX } from 'src/core/convert-md-to-jsx';
import { getYouTubeEmbedUrl, translate } from 'src/core/helpers/utils';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import BackLink from 'src/modules/General/components/BackLink';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import Link from 'src/modules/General/components/Link';
import variables from 'src/styles/constants/_exports.module.scss';

import { usePublish } from './usePublish';

export const Publish = () => {
  const {
    data: {
      cover_url,
      currentIdentity,
      problem_statement,
      category,
      website,
      country,
      title,
      description,
      solution,
      goals,
      total_requested_amount,
      cost_beakdown,
      feasibility,
      video,
      social_cause,
    },
    operations: { navigate, onEditProject, onPublish },
  } = usePublish();

  const details = [
    {
      label: translate('projects-detail.created-by'),
      content: (
        <AvatarLabelGroup
          avatarSize="3rem"
          account={{
            id: currentIdentity?.id || '',
            name: currentIdentity?.name,
            username: currentIdentity?.username || '',
            img: currentIdentity?.img,
            type: 'organizations',
          }}
        />
      ),
    },
    {
      label: translate('projects-detail.social-causes'),
      content: <span className="text-base font-semibold leading-6 text-Brand-600">{translate(social_cause)}</span>,
    },
    {
      label: 'Category',
      content: <span className="text-base font-semibold leading-6 text-Brand-600">{categoriesAdaptor(category)}</span>,
    },
    {
      label: translate('projects-detail.website'),
      content: (
        <Link
          label={website || ''}
          href={website || ''}
          target="_blank"
          className="text-base font-semibold leading-6 text-Brand-600"
        />
      ),
    },
    {
      label: translate('projects-detail.location'),
      content: (
        <div className="flex items-center gap-1.5 text-base font-semibold leading-6 text-Brand-600">
          {country && <Icon name="marker-pin-02" fontSize={20} color={variables.color_grey_400} />}
          {country ? country : 'Worldwide'}
        </div>
      ),
    },
  ];
  const contents = [
    { label: 'Project Description', content: convertMarkdownToJSX(description) },
    { label: 'Problem Statement', content: convertMarkdownToJSX(problem_statement) },
    { label: 'Solution', content: convertMarkdownToJSX(solution) },
    { label: 'Key Deliverables & Goals', content: goals ? convertMarkdownToJSX(goals) : '' },
    {
      label: 'Funding and budget',
      content: (
        <>
          <div>{`Total amount requested: ${total_requested_amount}`}</div>
          {convertMarkdownToJSX(cost_beakdown)}
        </>
      ),
    },
    { label: 'Feasibility and team', content: convertMarkdownToJSX(feasibility) },
  ];

  return (
    <div className="flex flex-col gap-6 px-4 py-8 md:p-8 container">
      <BackLink title="Back" onBack={() => navigate('/projects')} customStyle="md:!hidden !justify-start !p-0" />
      <img
        src={cover_url || '/images/explorer-cover.png'}
        alt="Project Cover"
        width="100%"
        height="100%"
        className="rounded-2xl"
      />
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-2xl md:text-3xl font-medium">{title}</span>
        </div>

        <div className="flex items-stretch gap-3">
          <Button
            color="info"
            customStyle="flex-1 min-w-[10rem] !text-Gray-light-mode-900 break-keep"
            onClick={onPublish}
          >
            {'Publish'}
          </Button>

          <div className="flex flex-col items-stretch gap-1">
            <Button color="primary" fullWidth customStyle="min-w-[10rem] break-keep" onClick={onEditProject}>
              {translate('projects-detail.edit-button')}
            </Button>
          </div>
        </div>
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
      {contents.map(
        ({ label, content }) =>
          content ?? (
            <div key={label} className="flex flex-col items-stretch gap-8 leading-6 text-Gray-light-mode-600">
              <span className="text-2xl font-semibold leading-8 text-Gray-light-mode-900">{label}</span>
              {content}
            </div>
          ),
      )}
      {video && (
        <div className="flex flex-col items-stretch gap-8 mt-12">
          <div className="relative mx-auto w-full max-w-[620px] md:max-w-[620px] aspect-[16/9]">
            <iframe
              src={getYouTubeEmbedUrl(video)}
              title="Project Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
