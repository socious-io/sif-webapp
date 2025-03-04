import { translate } from 'src/core/helpers/utils';
import ConnectWalletForm from 'src/modules/CreateProject/containers/ConnectWalletForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep4 = () => {
  const verified = false;
  return (
    <TwoColumnLayout title={'Connect a wallet'} description={'Connect your wallet to receive donations and fund'}>
      <ConnectWalletForm />
    </TwoColumnLayout>
  );
};
