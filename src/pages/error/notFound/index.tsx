import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-6 px-6 py-12 text-center">
      <h1 className="text-5xl font-extrabold text-Brand-700">{translate('error-not-found.header')}</h1>
      <p className="mb-4 text-base text-Gray-light-mode-700">
        {translate('error-not-found.subheader')}
        <span className="font-semibold text-Gray-light-mode-900"> {translate('socious-fund')}</span>.
      </p>
      <Button color="primary" onClick={() => navigate('/')}>
        {translate('error-not-found.go-to-home-btn')}
      </Button>
    </div>
  );
};
