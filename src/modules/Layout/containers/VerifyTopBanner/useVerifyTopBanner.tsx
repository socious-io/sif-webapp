import { useState } from 'react';
import { useSelector } from 'react-redux';
import { config } from 'src/config';
import { CurrentIdentity } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useVerifyTopBanner = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const id = currentIdentity?.id;
  const type = currentIdentity?.type;
  const verified = currentIdentity?.verified;
  const isPendingStatus = currentIdentity?.status === 'PENDING';
  const pendingOrgVerification = type === 'organizations' && isPendingStatus;
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');

  const onVerifyIdentity = () => {
    if (type === 'organizations') window.open(config.accountCenterURL + `/kyb?id=${id}`, '_blank');
    else window.open(config.accountCenterURL + '/verification', '_blank');
  };

  const onDismiss = () => {
    localStorage.setItem('hideVerifiedBanner', 'true');
    setHideVerifyBanner(true);
  };

  return {
    data: {
      isAuthenticated: !!currentIdentity,
      type,
      verified,
      hideVerifyBanner,
      pendingOrgVerification,
    },
    operations: {
      onDismiss,
      onVerifyIdentity,
    },
  };
};
