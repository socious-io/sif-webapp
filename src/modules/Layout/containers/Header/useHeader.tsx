import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [submissionOverModal, setSubmissionOverModal] = useState(false);
  const round = useSelector((state: RootState) => state.round.round);

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
    const isSubmissionOver = getDaysUntil(round?.submission_end_at as string) <= 0;
    if (isSubmissionOver) {
      setSubmissionOverModal(true);
      return;
    }
    if (currentIdentity?.type === 'users') navigate('/create/select-identity');
    if (currentIdentity?.type === 'organizations') {
      if (currentIdentity.verified) navigate('/create');
      else setOpenVerifyModal(true);
    }
  };

  const onLogout = () => {
    logout();
    navigate('/intro');
  };

  const navigateIntro = () => navigate('/intro');
  const navigateSettings = () => navigate('/settings');
  const navigateRefer = () => navigate('/refer');

  return {
    accounts,
    image,
    userType,
    onCreate,
    onLogout,
    navigateIntro,
    openVerifyModal,
    setOpenVerifyModal,
    navigateSettings,
    navigateRefer,
    submissionOverModal,
    setSubmissionOverModal,
  };
};
