import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { config } from 'src/config';
import { Project } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/adaptors';
import { removeProjects } from 'src/core/api';
import { getDaysUntil } from 'src/core/helpers/date-converter';
import { RootState } from 'src/store';

export const useProjectDetail = () => {
  const navigate = useNavigate();
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const { id: projectId } = useParams();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const isOwner = currentIdentity?.id === detail.creator?.id;
  const round = useSelector((state: RootState) => state.round.round);
  const roundIsClosed = getDaysUntil(round?.voting_end_at as Date) <= 0;
  const [isShared, setIsShared] = useState(false);

  const onShare = async () => {
    try {
      const currentUrl = window.location.origin + location.pathname;
      await navigator.clipboard.writeText(currentUrl);
      setIsShared(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const onEditProject = () => navigate(`/${projectId}/edit`);

  const onVote = () => {
    if (currentIdentity) {
      navigate('vote');
      // if (currentIdentity?.verified) navigate('vote');
      // else setShowConfirmationModal(true);
    } else navigate('/intro');
  };
  const removeProject = async () => {
    setOpenVerifyModal(false);
    await removeProjects(projectId as string);
    navigate('/projects');
  };
  const isSubmissionOver = getDaysUntil(round?.submission_end_at as string) <= 0;
  const navigateToVerify = () => {
    window.open(config.accountCenterURL + '/verification', '_blank');
  };
  return {
    data: {
      detail,
      projectId,
      isOwner,
      roundIsClosed,
      round,
      isShared,
      currentIdentity,
      openVerifyModal,
      isSubmissionOver,
      showConfirmationModal,
    },
    operations: {
      navigate,
      onShare,
      onEditProject,
      onVote,
      removeProject,
      setOpenVerifyModal,
      setShowConfirmationModal,
      navigateToVerify,
    },
  };
};
