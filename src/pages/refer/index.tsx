import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { config } from 'src/config';
import { CurrentIdentity } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import Link from 'src/modules/General/components/Link';
import ReferCard from 'src/modules/Refer/components/ReferCard';
import { RootState } from 'src/store';

export const Refer = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const currentIdentityUsername = currentIdentity?.usernameVal;

  return (
    <div className="container md:py-6">
      <div className="max-w-full md:max-w-[926px] flex items-stretch flex-col gap-6 md:gap-8 px-4 py-6 md:p-8">
        <div className="flex flex-col gap-1 pb-5 border border-x-0 border-t-0 border-b border-solid border-Gray-light-mode-200">
          <Typography variant="h3" className="text-Gray-light-mode-900">
            {translate('refer-header')}
          </Typography>
          <Typography variant="h5" className="text-Gray-light-mode-600">
            {translate('refer-subheader')}
          </Typography>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-normal leading-6 text-Gray-light-mode-600">{translate('refer-desc')}</span>
          <Link
            label={translate('refer-learn-more-link')}
            href="https://socious.gitbook.io/whitepaper/socio-tokens/how-to-get-socio"
            target="_blank"
            customStyle="w-fit !text-base !leading-6"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <ReferCard
            title={translate('refer-org-title')}
            subtitle={translate('refer-org-subtitle')}
            copyLink={config.appBaseURL + `/referral?referred_by=${currentIdentityUsername}`}
            referrerReward={translate('refer-org-referrer')}
            refereeReward={translate('refer-org-referee')}
          />
          <ReferCard
            title={translate('refer-user-title')}
            subtitle={translate('refer-user-subtitle')}
            copyLink={config.appBaseURL + `/referral?referred_by=${currentIdentityUsername}`}
            referrerReward={translate('refer-user-referrer')}
            refereeReward={translate('refer-user-referee')}
            color="green"
          />
        </div>
      </div>
    </div>
  );
};
