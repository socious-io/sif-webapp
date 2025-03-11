import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Identity, OrgMeta, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';

export const useHeader = () => {
  const [accounts, setaccounts] = useState([]);
  const [userType, setUserType] = useState<'users' | 'organizations'>('users');
  const [image, setImage] = useState('');

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
        img: user.avatar || org.image || '',
        type: i.type,
        name: user.name || org.name,
        username: user.username || org.shortname,
        selected: user.id === currentIdentity?.id,
      };
    });
    setaccounts(accList);
  }, [identities]);

  useEffect(() => {
    if (currentIdentity) {
      setUserType(currentIdentity.type);
      setImage((currentIdentity.meta as UserMeta).avatar || (currentIdentity.meta as OrgMeta).image || '');
    }
  }, [currentIdentity]);
  return { accounts, image, userType };
};
