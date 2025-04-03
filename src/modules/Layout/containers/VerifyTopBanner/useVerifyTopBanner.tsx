import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useVerifyTopBanner = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const type = currentIdentity?.type;
  const verified = currentIdentity?.verified;
  const isPendingStatus = currentIdentity?.status === 'PENDING';
  const pendingOrgVerification = type === 'organizations' && isPendingStatus;
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');
  const [openVerifyModal, setOpenVerifyModal] = useState(false);

  const onVerifyIdentity = () => console.log('verify identity and navigate to account center');

  const onDismiss = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  return {
    data: {
      type,
      verified,
      hideVerifyBanner,
      pendingOrgVerification,
      openVerifyModal,
    },
    operations: {
      onDismiss,
      onVerifyIdentity,
      setOpenVerifyModal,
    },
  };
};
