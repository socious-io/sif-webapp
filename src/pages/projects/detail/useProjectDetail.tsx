import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { Project } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useProjectDetail = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const round = useSelector((state: RootState) => state.round.round);

  //FIXME: not static
  const isOwner = false;
  const roundIsClosed = false;

  const onShare = () => console.log('share');

  const onEditProject = () => console.log('edit project:', projectId);

  const onVote = () => navigate('vote');

  return {
    data: { detail, projectId, isOwner, roundIsClosed, round },
    operations: { navigate, onShare, onEditProject, onVote },
  };
};
