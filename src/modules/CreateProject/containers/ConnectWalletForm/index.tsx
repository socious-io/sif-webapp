import Button from 'src/modules/General/components/Button';
import ConnectButton from 'src/modules/General/components/ConnectButton';

import { useConnectWalletForm } from './useConnectWalletForm';

const ConnectWalletForm: React.FC = () => {
  const { navigatePublish } = useConnectWalletForm();

  return (
    <div>
      <h2>Connect a Cardano compatible wallet</h2>
      <p>
        To create a project on our platform, you will need to connect a Cardano compatible wallet. We are using ADA on
        the Cardano network for transactions to ensure transparency, security, and fairness in the funding process.
      </p>
      <br />
      <p>
        Currently, we only support Lace Wallet for connection. Lace is a user-friendly wallet developed by Input Output
        Global, available as a browser extension. It fully supports ADA transactions and other Cardano features
        necessary for interacting with our platform.
      </p>
      {/* <ConnectButton /> */}
      <Button color="primary" block>
        Connect Wallet
      </Button>

      <Button color="primary" block type="submit" onClick={navigatePublish}>
        Preview
      </Button>
      <Button color="secondary" block variant="outlined" customStyle="mt-[16px]">
        Cancel
      </Button>
    </div>
  );
};
export default ConnectWalletForm;
