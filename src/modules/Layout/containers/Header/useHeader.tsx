import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, Identity, OrgMeta, UserMeta } from 'src/core/api';
import { logout } from 'src/core/api/auth/auth.service';
import { RootState } from 'src/store';

export const useHeader = () => {
  const [accounts, setAccounts] = useState([]);
  const [userType, setUserType] = useState<'users' | 'organizations'>('users');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const identities = useSelector<RootState, Identity[]>(state => {
    return state.identity.entities;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  useEffect(() => {
    const accList = identities.map(i => {
      const user = i.meta as UserMeta;
      const org = i.meta as OrgMeta;
      return {
        id: i.id,
        img: i.type === 'users' ? user.avatar?.url : org.logo?.url,
        type: i.type,
        name: i.type === 'users' ? `${user.first_name} ${user.last_name}` : org.shortname,
        email: `@${user.username || org.shortname}`,
        selected: i.id === currentIdentity?.id,
      };
    });
    //FIXME: type error issue -___________-
    setAccounts(accList);
  }, [identities]);

  useEffect(() => {
    if (currentIdentity) {
      setUserType(currentIdentity.type);
      setImage((currentIdentity.meta as UserMeta).avatar?.url || (currentIdentity.meta as OrgMeta).image || '');
    }
  }, [currentIdentity]);

  const navigateCreate = () => {
    if (currentIdentity?.type === 'organizations') navigate('/create');
    else if (currentIdentity?.type === 'users') navigate('/create/select-identity');
    else navigate('/intro');
  };
  const onLogout = () => {
    logout();
    navigate('/intro');
  };
  const navigateIntro = () => navigate('/intro');
  const disabledCreate = currentIdentity?.type === 'organizations' && currentIdentity?.meta?.verified;

  return { accounts, image, userType, navigateCreate, onLogout, navigateIntro, disabledCreate };
};
