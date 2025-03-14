import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, OrgMeta, identities } from 'src/core/api';
import { switchAccount } from 'src/core/api/auth/auth.service';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useIconDropDown = () => {
  const user = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  })?.meta;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const allIdentities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const myProfile = currentIdentity?.id === user?.id;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSwitchAccount = async (accountId: string) => {
    await switchAccount(accountId);
    setOpen(false);
  };

  const navigateToOnboarding = async () => {
    if (currentIdentity?.type === 'organizations') {
      localStorage.setItem('registerFor', 'user');
      const userAccount = allIdentities.find(a => a.type === 'users');
      await nonPermanentStorage.set({ key: 'identity', value: userAccount!.id });
      const identityList = await identities();
      dispatch(setIdentityList(identityList));
    } else {
      localStorage.setItem('registerFor', 'organization');
    }
    navigate('#');
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return { onSwitchAccount, open, myProfile, handleClick, handleOpen, handleClose, navigateToOnboarding };
};
