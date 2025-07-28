import { translate } from 'src/core/helpers/utils';
import ConnectWalletForm from 'src/modules/CreateProject/containers/ConnectWalletForm';
import UploadBannerForm from 'src/modules/CreateProject/containers/UploadBannerForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep6 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step6-title')}
      description={translate('create-project-step6-description')}
    >
      <UploadBannerForm />
    </TwoColumnLayout>
  );
};
