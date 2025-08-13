import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

export const FallBack = () => {
  const navigate = useNavigate();
  const flag = 'refreshed';
  const refreshed = sessionStorage.getItem(flag);

  if (!refreshed) {
    sessionStorage.setItem(flag, `${new Date().getTime()}`);
    window.location.reload();
    return <></>;
  }

  return (
    <div className="fixed w-screen h-screen flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <div className="text-[5rem] font-extrabold text-Error-600">500</div>
      <div className="text-5xl font-semibold text-Gray-light-mode-900">{translate('error-internal.header')}</div>
      <div className="text-2xl text-Gray-light-mode-700 mb-4">{translate('error-internal.subheader')}</div>
      <Button color="primary" onClick={() => navigate('/')}>
        {translate('error-internal.home-btn')}
      </Button>
    </div>
  );
};
