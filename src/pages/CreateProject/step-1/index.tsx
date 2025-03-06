import { translate } from 'src/core/helpers/utils';
import LocationCauseForm from 'src/modules/CreateProject/containers/LocationCauseForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep1 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step1-title')}
      description={translate('create-project-step1-description')}
    >
      <LocationCauseForm />
    </TwoColumnLayout>
  );
};
