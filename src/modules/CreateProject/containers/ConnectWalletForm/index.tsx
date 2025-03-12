import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';

import { useConnectWalletForm } from './useConnectWalletForm';
const ConnectWalletForm: React.FC = () => {
  const { navigatePublish, goBack, Web3Connect, isEnabled } = useConnectWalletForm();

  return (
    <div>
      <div className="">
        <h2 className="text-lg font-medium leading-7 text-gray-700">{translate('connect-wallet-title')}</h2>
        <p className="text-base font-normal leading-6 text-gray-600">{translate('connect-wallet-description1')}</p>
        <br />
        <p className="text-base font-normal leading-6 text-gray-600">{translate('connect-wallet-description2')}</p>
        <div className="mt-2xl mb-4xl">
          <Web3Connect />
        </div>
      </div>
      <div>
        <div className="mb-4 mt-8">
          <a
            href="#"
            className="text-[16px] font-semibold leading-[24px] underline underline-offset-2 decoration-solid"
          >
            {translate('connect-wallet-why-crypto')}
          </a>
        </div>
        <div className="mb-8">
          <a
            href="#"
            className="text-[16px] font-semibold leading-[24px] underline underline-offset-2 decoration-solid"
          >
            {translate('connect-wallet-more-lace')}
          </a>
        </div>
        <div>
          {translate('connect-wallet-support-text')}{' '}
          <a
            href="#"
            className="text-[16px] font-semibold leading-[24px] underline underline-offset-2 decoration-solid"
          >
            {translate('connect-wallet-support-link')}
          </a>
        </div>
      </div>
      <Button color="primary" block type="submit" onClick={navigatePublish} disabled={!isEnabled} customStyle="mt-6xl">
        {translate('preview-button')}
      </Button>
      <Button color="secondary" block variant="text" customStyle="mt-[16px]" onClick={goBack}>
        {translate('back-button')}
      </Button>
    </div>
  );
};
export default ConnectWalletForm;
