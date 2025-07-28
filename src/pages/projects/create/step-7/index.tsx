import { translate } from 'src/core/helpers/utils';
import ConnectWalletForm from 'src/modules/CreateProject/containers/ConnectWalletForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep7 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step7-title')}
      description={translate('create-project-step7-description')}
    >
      <ConnectWalletForm />
    </TwoColumnLayout>
  );
};
