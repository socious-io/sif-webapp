import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { CurrentIdentity } from 'src/core/adaptors';
import { logout } from 'src/core/api/auth/auth.service';
import { getDaysUntil } from 'src/core/helpers/date-converter';
import { RootState } from 'src/store';

export const useHeader = () => {
  const navigate = useNavigate();
  const identities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const currentIdentity = identities.find(identity => identity.current);
  const [accounts, setAccounts] = useState<CurrentIdentity[]>([]);
  const [userType, setUserType] = useState<'users' | 'organizations'>('users');
  const [image, setImage] = useState('');
  const [submissionOverModal, setSubmissionOverModal] = useState(false);
  const [openKybModal, setOpenKybModal] = useState(false);
  const round = useSelector((state: RootState) => state.round.round);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  useEffect(() => {
    setAccounts(identities);
  }, [identities]);

  useEffect(() => {
    if (currentIdentity) {
      setUserType(currentIdentity.type);
      setImage(currentIdentity.img);
    }
  }, [currentIdentity]);

  const onCreate = () => {
    if (currentIdentity === undefined) {
      navigate('/intro');
      return;
    }
    const isSubmissionOver = getDaysUntil(round?.submission_end_at as string) <= 0;
    if (isSubmissionOver) {
      setSubmissionOverModal(true);
      return;
    }
    if (currentIdentity?.type === 'users') navigate('/create/select-identity');
    if (currentIdentity?.type === 'organizations') {
      if (currentIdentity.verified) navigate('/create');
      else setOpenKybModal(true);
    }
  };

  const onLogout = () => {
    logout();
    navigate('/intro');
  };

  const navigateIntro = () => navigate('/intro');

  const navigateSettings = () => navigate('/settings');

  const navigateRefer = () => navigate('/refer');

  const navigateKyb = () => window.open(config.accountCenterURL + `/kyb?id=${currentIdentity?.id}`, '_blank');

  const navigateMyProjects = () => {
    if (currentIdentity?.type === 'users') {
      setAlertModalVisible(true);
    } else {
      navigate(`/dashboard/${currentIdentity?.id}`);
    }
  };

  return {
    data: {
      accounts,
      image,
      userType,
      submissionOverModal,
      openKybModal,
      alertModalVisible,
    },
    operations: {
      onCreate,
      onLogout,
      navigateIntro,
      navigateSettings,
      navigateRefer,
      setSubmissionOverModal,
      setOpenKybModal,
      navigateKyb,
      navigateMyProjects,
      setAlertModalVisible,
    },
  };
};
