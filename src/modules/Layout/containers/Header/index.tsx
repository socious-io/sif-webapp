import { useNavigate } from 'react-router-dom';
import logo from 'src/assets/logo/logo.svg';
import { translate } from 'src/core/helpers/utils';
import Avatar from 'src/modules/General/components/Avatar';
import Button from 'src/modules/General/components/Button';
import variables from 'src/styles/constants/_exports.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full border-b border-b-Gray-light-mode-300 border-solid border-t-0 border-l-0 border-r-0">
      <div className="max-w-[1280px] w-full h-[72px] flex items-center justify-between mx-auto px-4">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="mr-2" />
          <h1 className="hidden sm:block text-[20px] font-semibold leading-[30px] text-Brand-600">
            Socious innovation fund
          </h1>
        </div>
        <div className="flex">
          <Button
            color="secondary"
            variant="outlined"
            customStyle="h-[40px] text-sm font-semibold leading-5 mr-6"
            onClick={() => navigate('/create')}
          >
            {translate('layout-action-button')}
          </Button>
          <Avatar type="organizations" size="40px" />
        </div>
      </div>
    </div>
  );
};

export default Header;
