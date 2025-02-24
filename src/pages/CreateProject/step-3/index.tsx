import { translate } from 'src/core/helpers/utils';
import NameDescriptionForm from 'src/modules/CreateProject/containers/NameDescriptionForm';
import UploadBannerForm from 'src/modules/CreateProject/containers/UploadBannerForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep3 = () => {
  const verified = false;

  return (
    <TwoColumnLayout
      title={'Add a cover photo'}
      description={'Using a bright and clear photo helps people connect to your project right away.'}
      descriptionMode="html"
    >
      <UploadBannerForm />
    </TwoColumnLayout>
  );
};
