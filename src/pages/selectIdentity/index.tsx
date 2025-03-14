import logo from 'src/assets/logo/socious-logo.svg';
import { translate } from 'src/core/helpers/utils';
import AvatarButton from 'src/modules/General/components/AvatarButton';
import BackLink from 'src/modules/General/components/BackLink';

import { useSelectIdentity } from './useSelectIdentity';

export const SelectIdentity = () => {
  const { organizations, onSelectIdentity } = useSelectIdentity();
  console.log('ordddd', organizations);
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#FFF] md:bg-[#F9FAFB]">
      <div className="w-full max-w-[440px] flex flex-col gap-6 p-8 px-10 rounded-[12px] md:shadow-sm bg-[#FFF]">
        <img alt="logo" className="w-[40px] self-center" src={logo} />

        <p className="text-[#475467] text-sm font-normal leading-[20px] text-left">
          {translate('select-identity-thank-you')}
        </p>

        <p className="text-[#475467] text-sm font-normal leading-[20px] text-left">
          {translate('select-identity-support-projects')}
        </p>

        <ol className="text-[#475467] text-sm font-normal leading-[20px] space-y-2 list-decimal list-inside text-left">
          <li>{translate('select-identity-vote-projects')}</li>
          <li>{translate('select-identity-donate-projects')}</li>
          <li>{translate('select-identity-spread-awareness')}</li>
        </ol>

        <div className="mt-5 text-[#344054] text-sm font-medium text-left">
          {translate('select-identity-switch-org')}
        </div>
        {organizations.map((org, index) => (
          <AvatarButton key={index} account={org} onClick={account => onSelectIdentity(account.id)} />
        ))}
        <BackLink title={translate('back')} className="self-start" />
      </div>
    </div>
  );
};
