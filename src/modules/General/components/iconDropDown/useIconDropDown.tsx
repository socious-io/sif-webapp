import { useState } from 'react';
import { switchAccount } from 'src/core/api/auth/auth.service';

export const useIconDropDown = () => {
  const [open, setOpen] = useState(false);

  const onSwitchAccount = async (accountId: string) => {
    await switchAccount(accountId);
    setOpen(false);
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

  return { onSwitchAccount, open, handleClick, handleOpen, handleClose };
};
