import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { CurrentIdentity } from 'src/core/adaptors';
import { getDaysUntil } from 'src/core/helpers/date-converter';
import { RootState } from 'src/store';

export const useCreateProjectForm = () => {
  const navigate = useNavigate();
  const [submissionOverModal, setSubmissionOverModal] = useState(false);
  const [openKybModal, setOpenKybModal] = useState(false);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const round = useSelector((state: RootState) => state.round.round);

  const onCreate = () => {
    const isSubmissionOver = getDaysUntil(round?.submission_end_at as string) <= 0;
    if (isSubmissionOver) {
      setSubmissionOverModal(true);
      return;
    }
    if (currentIdentity?.type === 'users') navigate('/create/select-identity');
    if (currentIdentity?.type === 'organizations') {
      if (currentIdentity.verified) navigate('/create/step-1');
      else setOpenKybModal(true);
    }
  };

  const navigateKyb = () => window.open(config.accountCenterURL + `/kyb?id=${currentIdentity?.id}`, '_blank');

  return {
    data: {
      submissionOverModal,
      openKybModal,
    },
    operations: {
      onCreate,
      setSubmissionOverModal,
      setOpenKybModal,
      navigateKyb,
    },
  };
};
