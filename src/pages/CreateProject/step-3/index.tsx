import { translate } from 'src/core/helpers/utils';
import UploadBannerForm from 'src/modules/CreateProject/containers/UploadBannerForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep3 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step3-title')}
      description={translate('create-project-step3-description')}
      descriptionMode="html"
    >
      <UploadBannerForm />
    </TwoColumnLayout>
  );
};
