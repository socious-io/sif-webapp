import { translate } from 'src/core/helpers/utils';
import BudgetForm from 'src/modules/CreateProject/containers/BudgetForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep4 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step4-title')}
      description={
        <>
          <p className="mb-3">{translate('create-project-step4-description')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{translate('create-project-step4-question1')}</li>
            <li>{translate('create-project-step4-question2')}</li>
          </ul>
        </>
      }
    >
      <BudgetForm />
    </TwoColumnLayout>
  );
};
