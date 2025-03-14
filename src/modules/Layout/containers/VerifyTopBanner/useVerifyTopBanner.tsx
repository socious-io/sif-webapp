import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { OrgMeta, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';

export const useVerifyTopBanner = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const type = currentIdentity?.type;
  const verified =
    type === 'users'
      ? (currentIdentity?.meta as UserMeta).identity_verified_at
      : (currentIdentity?.meta as OrgMeta)?.verified;
  const isPendingStatus = (currentIdentity?.meta as OrgMeta)?.status === 'PENDING';
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
