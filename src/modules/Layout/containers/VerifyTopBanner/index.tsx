import { translate } from 'src/core/helpers/utils';
import TopBanner from 'src/modules/General/components/TopBanner';

import { useVerifyTopBanner } from './useVerifyTopBanner';

const VerifyTopBanner = () => {
  const {
    data: { isAuthenticated, type, verified, hideVerifyBanner, pendingOrgVerification },
    operations: { onDismiss, onVerifyIdentity },
  } = useVerifyTopBanner();
  const title =
    type === 'users'
      ? translate('layout-verification.title-identity')
      : translate('layout-verification.title-organization');

  if (!isAuthenticated) return;

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
      <TopBanner
        theme="warning"
        text={
          type === 'organizations'
            ? translate('layout-verification.not-verified-text', { title })
            : translate('layout-verification.not-verified-text-user')
        }
        supportingText={
          type === 'organizations'
            ? translate('layout-verification.not-verified-support-text', { title })
            : translate('layout-verification.not-verified-support-text-user')
        }
        secondaryButton={{
          children: translate('layout-verification.not-verified-secondary-btn'),
          href: 'https://socious.gitbook.io/fund/rewards',
        }}
        primaryButton={{
          children: translate('layout-verification.not-verified-primary-btn'),
          onClick: onVerifyIdentity,
        }}
      />
    );
  }
};

export default VerifyTopBanner;
