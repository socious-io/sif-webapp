import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/adaptors';
import { logout } from 'src/core/api/auth/auth.service';
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
  };
};
