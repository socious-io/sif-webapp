import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Project } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { getDaysUntil } from 'src/core/helpers/date-converter';
import { RootState } from 'src/store';

export const useProjectDetail = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const isOwner = currentIdentity?.id === detail.creator?.id;
  const round = useSelector((state: RootState) => state.round.round);

  const roundIsClosed = getDaysUntil(round?.voting_end_at as string) <= 0;

  const onShare = () => console.log('share');

  const onEditProject = () => navigate(`/${projectId}/edit`);

  const onVote = () => navigate('vote');

  return {
    data: { detail, projectId, isOwner, roundIsClosed, round },
    operations: { navigate, onShare, onEditProject, onVote },
  };
};
