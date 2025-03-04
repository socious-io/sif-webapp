import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Project } from 'src/core/adaptors';

export const useProjectDetail = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  //FIXME: not static
  const isOwner = false;
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
