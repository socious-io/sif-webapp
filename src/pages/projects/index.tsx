import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { OptionType } from 'src/core/adaptors';
import { Round } from 'src/core/api';
import { convertDateFormat, getDaysUntil } from 'src/core/helpers/date-converter';
import { translate } from 'src/core/helpers/utils';
import Breadcrumbs from 'src/modules/General/components/Breadcrumbs';
import Chip from 'src/modules/General/components/Chip';
import ProjectsList from 'src/modules/Projects/containers/ProjectsList';
import { RootState } from 'src/store';

export const Projects = () => {
  const round = useSelector((state: RootState) => state.round.round);
  const { rounds } = useLoaderData() as { rounds: Array<Round> };
  const [searchParams, setSearchParams] = useSearchParams();
  const roundIdFromUrl = searchParams.get('round_id') || '';

  const initialRound = rounds.find(r => r.id === roundIdFromUrl) || (rounds.length > 0 ? rounds[0] : null);

  const roundIsClosed = round && getDaysUntil(round.voting_end_at) <= 0;
  const [selectedRound, setSelectedRound] = useState<OptionType | null>(
    initialRound ? { label: initialRound.name, value: initialRound.id } : null,
  );

  const handleRoundChange = (value: OptionType) => {
    setSelectedRound(value);
    const params: Record<string, string> = { page: '1' };
    if (value.value) params.round_id = value.value;
    const category = searchParams.get('category');
    const search = searchParams.get('q');
    if (category) params.category = category;
    if (search) params.q = search;
    setSearchParams(params);
  };

  // Sync selectedRound with URL when navigating back/forward
  useEffect(() => {
    if (roundIdFromUrl) {
      const roundFromUrl = rounds.find(r => r.id === roundIdFromUrl);
      if (roundFromUrl && roundFromUrl.id !== selectedRound?.value) {
        setSelectedRound({ label: roundFromUrl.name, value: roundFromUrl.id });
      }
    }
  }, [roundIdFromUrl, rounds]);

  const breadcrumbs = [
    { iconName: 'home-line', label: '', link: '/' },
    { label: translate('projects-breadcrumb-explore'), link: '/projects' },
    {
      label: selectedRound?.label || '',
      options: rounds.map(r => ({ label: r.name, value: r.id })),
      onChange: handleRoundChange,
      defaultValue: { label: rounds[0]?.name || '', value: rounds[0]?.name || '' },
    },
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
        <ProjectsList roundId={selectedRound?.value || ''} />
      </div>
    </>
  );
};
