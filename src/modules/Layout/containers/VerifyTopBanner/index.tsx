import { translate } from 'src/core/helpers/utils';
import TopBanner from 'src/modules/General/components/TopBanner';
import KYB from 'src/modules/Verification/containers/KYB';

import { useVerifyTopBanner } from './useVerifyTopBanner';

const VerifyTopBanner = () => {
  const {
    data: { type, verified, hideVerifyBanner, pendingOrgVerification, openVerifyModal },
    operations: { onDismiss, setOpenVerifyModal },
  } = useVerifyTopBanner();
  const title =
    type === 'users'
      ? translate('layout-verification.title-identity')
      : translate('layout-verification.title-organization');

  if (verified) {
    return (
      !hideVerifyBanner && (
        <TopBanner
          theme="success"
          text={translate('layout-verification.success-text', { title })}
          supportingText={translate('layout-verification.success-support-text', { title })}
          primaryButton={{ children: translate('layout-verification.success-primary-btn'), onClick: onDismiss }}
        />
      )
    );
  } else {
    return pendingOrgVerification ? (
      <TopBanner
        theme="warning"
        text={translate('layout-verification.pending-text')}
        supportingText={translate('layout-verification.pending-support-text')}
      />
    ) : (
      // for now just KYB
      type === 'organizations' && (
        <>
          <TopBanner
            theme="warning"
            text={translate('layout-verification.not-verified-text', { title })}
            supportingText={translate('layout-verification.not-verified-support-text', { title })}
            secondaryButton={{
              children: translate('layout-verification.not-verified-secondary-btn'),
              href: 'https://socious.io/verified-credentials',
            }}
            primaryButton={{
              children: translate('layout-verification.not-verified-primary-btn'),
              onClick: () => setOpenVerifyModal(true),
            }}
          />
          {type === 'organizations' && <KYB open={openVerifyModal} setOpen={setOpenVerifyModal} />}
        </>
      )
    );
  }
};

export default VerifyTopBanner;
