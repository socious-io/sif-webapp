import { Link } from 'react-router-dom';
import logo from 'src/assets/logo/logo.svg';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import ConfirmModal from 'src/modules/General/components/ConfirmModal';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import IconDropDown from 'src/modules/General/components/IconDropDown';
import NavPortal from 'src/modules/Layout/components/NavPortal';

import { useHeader } from './useHeader';

const Header: React.FC = () => {
  const {
    data: { accounts, image, userType, submissionOverModal, openKybModal },
    operations: {
      onCreate,
      onLogout,
      navigateIntro,
      navigateSettings,
      navigateRefer,
      setSubmissionOverModal,
      setOpenKybModal,
      navigateKyb,
    },
  } = useHeader();

  return (
    <div className="w-full border-b border-b-Gray-light-mode-300 border-solid border-t-0 border-l-0 border-r-0">
      <div className="max-w-[1280px] w-full h-[72px] flex items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center gap-2">
          <img src={logo} alt="Socious Fund Logo" />
          <span className="hidden sm:block text-[20px] font-semibold leading-[30px] text-Brand-600">
            {translate('socious-fund')}
          </span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            color="info"
            variant="outlined"
            customStyle="h-[40px] text-sm font-semibold leading-5"
            onClick={onCreate}
          >
            {translate('layout-action-button')}
          </Button>
          <NavPortal />
          {accounts.length > 0 ? (
            <IconDropDown
              type={userType}
              img={image}
              accounts={accounts}
              iconItems={[
                { iconName: 'stars-02', label: translate('header-refer'), onClick: navigateRefer },
                { iconName: 'settings-01', label: translate('header-setting'), onClick: navigateSettings },
                {
                  iconName: 'user-circle',
                  label: translate('header-support'),
                  onClick: () => (window.location.href = 'https://socious.org/#faq'),
                },
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
      <ConfirmModal
        open={submissionOverModal}
        handleClose={() => setSubmissionOverModal(false)}
        confirmHeader={translate('submission-closed-header')}
        confirmSubheader={translate('submission-closed-subheader')}
        buttons={[
          {
            children: translate('submission-closed-button'),
            color: 'info',
            variant: 'outlined',
            onClick: () => setSubmissionOverModal(false),
            customStyle: 'w-full',
          },
        ]}
        customStyle="md:max-w-[400px]"
      />
      <ConfirmModal
        open={openKybModal}
        handleClose={() => setOpenKybModal(false)}
        icon={<FeaturedIcon type="light-circle-outlined" iconName="check-circle" theme="primary" size="lg" />}
        confirmHeader={translate('kyb.title')}
        confirmSubheader={translate('kyb.subtitle')}
        footerDivider
        customStyle="md:max-w-[480px]"
        footerClassName="flex-col pt-6"
        buttons={[
          {
            children: translate('kyb.continue'),
            color: 'primary',
            variant: 'contained',
            block: true,
            onClick: navigateKyb,
          },
          {
            children: translate('kyb.cancel'),
            color: 'secondary',
            variant: 'text',
            block: true,
            onClick: () => setOpenKybModal(false),
          },
        ]}
      />
    </div>
  );
};

export default Header;
