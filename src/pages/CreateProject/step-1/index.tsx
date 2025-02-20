import { translate } from 'src/core/helpers/utils';
import CreateProjectForm from 'src/modules/CreateProject/containers/CreateProjectForm';
import LocationCauseForm from 'src/modules/CreateProject/containers/LocationCauseForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep1 = () => {
  const verified = false;
  return (
    <TwoColumnLayout
      title={"Let's begin your fundraising journey"}
      description={"We're here to guide you every step of the way."}
    >
      <LocationCauseForm />
    </TwoColumnLayout>
  );
};
