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
  //FIXME: identity_verified and verification_status from BE
  // const verified =
  //   type === 'users'
  //     ? (currentIdentity?.meta as UserMeta).identity_verified
  //     : (currentIdentity?.meta as OrgMeta)?.verified;
  // const verificationStatus = currentIdentity?.verification_status;
  // const pendingOrgVerification = type === 'organizations' && verificationStatus === 'PENDING';
  const verified = type === 'users' ? false : (currentIdentity?.meta as OrgMeta)?.verified;
  const pendingOrgVerification = false;
  const [hideVerifyBanner, setHideVerifyBanner] = useState(localStorage.getItem('hideVerifiedBanner') === 'true');
  const [connectUrl, setConnectUrl] = useState('');
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const checkVerificationCount = 5000;
  const clearIntervalCount = 120000;

  const onVerifyIdentity = async (setConnectUrl: (val: string) => void, setOpenVerifyModal: (val: boolean) => void) => {
    // const vc = await requestVerification();
    // setConnectUrl(vc.short_url);
    setOpenVerifyModal(true);

    const interval = setInterval(async () => {
      //   const res = await checkVerification();
      //   if (res.verified) {
      // await store.dispatch(currentIdentities());
      // clearInterval(interval);
      // setOpenVerifyModal(false);
      //   }
    }, checkVerificationCount);

    setTimeout(() => {
      clearInterval(interval);
    }, clearIntervalCount);
  };

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
      connectUrl,
      openVerifyModal,
    },
    operations: {
      onDismiss,
      setConnectUrl,
      onVerifyIdentity,
      setOpenVerifyModal,
    },
  };
};
