import { useState } from 'react';

export const useKYB = (setOpen: (open: boolean) => void) => {
  const [openModals, setOpenModals] = useState<{ [key in 'desc' | 'upload' | 'success']: boolean }>({
    desc: true,
    upload: false,
    success: false,
  });

  const handleClose = () => {
    setOpenModals({ desc: true, upload: false, success: false });
    setOpen(false);
  };

  const handleContinueFirstStep = () => {
    setOpenModals({ desc: false, upload: true, success: false });
  };

  const handleOpenSuccessModal = () => {
    setOpenModals({ desc: false, upload: false, success: true });
  };

  return {
    data: {
      openModals,
    },
    operations: {
      handleClose,
      handleContinueFirstStep,
      handleOpenSuccessModal,
    },
  };
};
