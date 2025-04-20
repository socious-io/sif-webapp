import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

import { useConnectWalletForm } from './useConnectWalletForm';
const ConnectWalletForm: React.FC = () => {
  const { navigatePublish, goBack, isEnabled, ConnectButton } = useConnectWalletForm();

  return (
    <div>
      <div className="">
        <h2 className="text-lg font-medium leading-7 text-Brand-700">{translate('connect-wallet-title')}</h2>
        <p className="text-base font-normal leading-6 text-Gray-light-mode-600">
          {translate('connect-wallet-description1')}
        </p>
        <br />
        <p className="text-base font-normal leading-6 text-Gray-light-mode-600">
          {translate('connect-wallet-description2')}
        </p>
        <div className="mt-2xl mb-4xl">
          <ConnectButton />
        </div>
      </div>
      <div>
        <div className="mb-4 mt-8">
          <a
            target="_blank"
            href="https://socious.org/#faq"
            className="text-[16px] font-semibold leading-6 underline underline-offset-2 decoration-solid text-Brand-700"
            rel="noreferrer"
          >
            {translate('connect-wallet-why-crypto')}
          </a>
        </div>
        <div className="mb-8">
          <a
            href="https://www.lace.io/"
            target="_blank"
            className="text-[16px] font-semibold leading-6 underline underline-offset-2 decoration-solid text-Brand-700"
            rel="noreferrer"
          >
            {translate('connect-wallet-more-lace')}
          </a>
        </div>
        <div className="text-base font-normal leading-6 text-Gray-light-mode-600">
          {translate('connect-wallet-support-text')}
          <a
            target="_blank"
            href="https://socious.org/#faq"
            className="text-[16px] font-semibold leading-6 underline underline-offset-2 decoration-solid text-Brand-700"
            rel="noreferrer"
          >
            {translate('connect-wallet-support-link')}
          </a>
        </div>
      </div>
      <Button color="primary" block type="submit" onClick={navigatePublish} customStyle="mt-6xl">
        {translate('preview-button')}
      </Button>
      <Button color="secondary" block variant="text" customStyle="mt-[16px]" onClick={goBack}>
        {translate('back-button')}
      </Button>
    </div>
  );
};
export default ConnectWalletForm;
