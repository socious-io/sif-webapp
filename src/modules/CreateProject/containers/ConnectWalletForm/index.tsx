import { We } from 'src/dapp/dapp.connect';
import Button from 'src/modules/General/components/Button';

import { useConnectWalletForm } from './useConnectWalletForm';

const ConnectWalletForm: React.FC = () => {
  const { navigatePublish, goBack, Web3Connect, isEnabled } = useConnectWalletForm();

  return (
    <div>
      <div className="">
        <h2 className="text-lg font-medium leading-7 text-gray-700">Connect a Cardano compatible wallet</h2>
        <p className="text-base font-normal leading-6 text-gray-600">
          To create a project on our platform, you will need to connect a Cardano compatible wallet. We are using ADA on
          the Cardano network for transactions to ensure transparency, security, and fairness in the funding process.
        </p>
        <br />
        <p className="text-base font-normal leading-6 text-gray-600">
          Currently, we only support Lace Wallet for connection. Lace is a user-friendly wallet developed by Input
          Output Global, available as a browser extension. It fully supports ADA transactions and other Cardano features
          necessary for interacting with our platform.
        </p>
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
            Why are we using cryptocurrency?
          </a>
        </div>
        <div className="mb-8">
          <a
            href="#"
            className="text-[16px] font-semibold leading-[24px] underline underline-offset-2 decoration-solid"
          >
            More about Lace Wallet
          </a>
        </div>
        <div>
          If you have any questions, concerns, or need help with connecting your wallet, please don't hesitate to reach
          out to our{' '}
          <a
            href="#"
            className="text-[16px] font-semibold leading-[24px] underline underline-offset-2 decoration-solid"
          >
            support team.
          </a>
        </div>
      </div>
      <Button color="primary" block type="submit" onClick={navigatePublish} disabled={!isEnabled} customStyle="mt-6xl">
        Preview
      </Button>
      <Button color="secondary" block variant="outlined" customStyle="mt-[16px]" onClick={goBack}>
        Back
      </Button>
    </div>
  );
};
export default ConnectWalletForm;
