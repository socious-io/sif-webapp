import { translate } from 'src/core/helpers/utils';
import FeasibilityForm from 'src/modules/CreateProject/containers/FeasibilityForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep5 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step5-title')}
      description={
        <>
          <p className="mb-3">{translate('create-project-step5-description')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{translate('create-project-step5-question1')}</li>
            <li>{translate('create-project-step5-question1')}</li>
          </ul>
        </>
      }
    >
      <FeasibilityForm />
    </TwoColumnLayout>
  );
};
