import { translate } from 'src/core/helpers/utils';
import NameDescriptionForm from 'src/modules/CreateProject/containers/NameDescriptionForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep2 = () => {
  const description = (
    <>
      <p className="mb-3">{translate('create-project-step2-description')}</p>
      <ul className="list-disc list-inside space-y-2">
        <li>{translate('create-project-step2-question1')}</li>
        <li>{translate('create-project-step2-question2')}</li>
        <li>{translate('create-project-step2-question3')}</li>
      </ul>
    </>
  );
  return (
    <TwoColumnLayout title={translate('create-project-step2-title')} description={description} descriptionMode="html">
      <NameDescriptionForm />
    </TwoColumnLayout>
  );
};
