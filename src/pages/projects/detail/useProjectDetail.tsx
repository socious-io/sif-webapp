import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Project } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

export const useProjectDetail = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const isOwner = currentIdentity?.id === detail.creator?.id;
  //FIXME: not static
  const roundIsClosed = false;

  const onShare = () => console.log('share');

  const onEditProject = () => console.log('edit project:', projectId);

  const onVote = () => navigate('vote');

  return {
    data: {
      detail,
      projectId,
      isOwner,
      roundIsClosed,
    },
    operations: {
      navigate,
      onShare,
      onEditProject,
      onVote,
    },
  };
};
