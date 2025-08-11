import { translate } from 'src/core/helpers/utils';
import ProjectCategoryForm from 'src/modules/CreateProject/containers/ProjectCategoryForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep3 = () => {
  return (
    <TwoColumnLayout
      title={translate('create-project-step3-title')}
      description={
        <>
          <p className="mb-3">{translate('create-project-step3-description')}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{translate('create-project-step3-question1')}</li>
            <li>{translate('create-project-step3-question2')}</li>
            <li>{translate('create-project-step3-question3')}</li>
            <li>{translate('create-project-step3-question4')}</li>
          </ul>
        </>
      }
    >
      <ProjectCategoryForm />
    </TwoColumnLayout>
  );
};
