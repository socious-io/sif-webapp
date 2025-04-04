import logo from 'src/assets/logo/logo.svg';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import { IconDropDown } from 'src/modules/General/components/iconDropDown';
import KYB from 'src/modules/Verification/containers/KYB';

import { useHeader } from './useHeader';

const Header: React.FC = () => {
  const {
    accounts,
    image,
    userType,
    onCreate,
    onLogout,
    navigateIntro,
    openVerifyModal,
    setOpenVerifyModal,
    navigateSettings,
  } = useHeader();
  return (
    <div className="w-full border-b border-b-Gray-light-mode-300 border-solid border-t-0 border-l-0 border-r-0">
      <div className="max-w-[1280px] w-full h-[72px] flex items-center justify-between mx-auto px-4">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="mr-2" />
          <a href="/home" className="hidden sm:block text-[20px] font-semibold leading-[30px] text-Brand-600">
            {translate('socious-fund')}
          </a>
        </div>
        <div className="flex">
          <Button
            color="secondary"
            variant="outlined"
            customStyle="h-[40px] text-sm font-semibold leading-5 mr-6"
            onClick={onCreate}
          >
            {translate('layout-action-button')}
          </Button>
          {accounts.length > 0 ? (
            <IconDropDown
              type={userType}
              img={image}
              accounts={accounts}
              iconItems={[
                {
                  iconName: 'user-circle',
                  label: translate('header-support'),
                  onClick: () => (window.location.href = 'https://socious.org/#faq'),
                },
                { iconName: 'settings-01', label: translate('header-setting'), onClick: navigateSettings },
                { iconName: 'log-out-01', label: translate('header-logout'), onClick: onLogout },
              ]}
              createItem
            />
          ) : (
            <Button color="secondary" variant="text" onClick={navigateIntro}>
              {translate('header-login')}
            </Button>
          )}
        </div>
      </div>
      <KYB open={openVerifyModal} setOpen={setOpenVerifyModal} />
    </div>
  );
};

export default Header;
