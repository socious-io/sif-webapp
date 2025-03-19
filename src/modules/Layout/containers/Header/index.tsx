import logo from 'src/assets/logo/logo.svg';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import { IconDropDown } from 'src/modules/General/components/iconDropDown';

import { useHeader } from './useHeader';

const Header: React.FC = () => {
  const { accounts, image, userType, navigateCreate, onLogout } = useHeader();
  return (
    <div className="w-full border-b border-b-Gray-light-mode-300 border-solid border-t-0 border-l-0 border-r-0">
      <div className="max-w-[1280px] w-full h-[72px] flex items-center justify-between mx-auto px-4">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="mr-2" />
          <a href="/home" className="hidden sm:block text-[20px] font-semibold leading-[30px] text-Brand-600">
            Socious Innovation Fund
          </a>
        </div>
        <div className="flex">
          <Button
            color="secondary"
            variant="outlined"
            customStyle="h-[40px] text-sm font-semibold leading-5 mr-6"
            onClick={navigateCreate}
          >
            {translate('layout-action-button')}
          </Button>
          {accounts.length > 0 && (
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
                // { iconName: 'settings-01', label: translate('header-setting'), onClick: console.log },
                { iconName: 'log-out-01', label: translate('header-logout'), onClick: onLogout },
              ]}
              createItem
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
