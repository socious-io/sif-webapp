import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { identities } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useAvatarDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = useSelector((state: RootState) => state.identity.entities);
  const [open, setOpen] = useState(false);
  const selectedAccount = accounts.find(account => account.current);
  const otherAccounts = accounts.filter(account => !account.current);

  const handleAvatarClick = () => {
    setOpen(!open);
  };

  const switchAccount = async (accountId: string) => {
    try {
      await nonPermanentStorage.set({ key: 'identity', value: accountId });
      const resp = await identities();
      dispatch(setIdentityList(resp.identities));
      navigate('/jobs');
      setOpen(false);
    } catch (error) {
      console.error('Error in switching account:', error);
    }
  };

  return { switchAccount, open, handleAvatarClick, accountList: accounts, selectedAccount, otherAccounts };
};
