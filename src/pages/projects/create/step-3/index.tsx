import { translate } from 'src/core/helpers/utils';
import ProjectCategoryForm from 'src/modules/CreateProject/containers/ProjectCategoryForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep3 = () => {
  return (
    <TwoColumnLayout
      title={'Tell donors what problem you are solving'}
      description={
        <>
          <p className="mb-3">{'Below are some questions to help you start writing. You can always edit it later:'}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{'What is the category of your project?'}</li>
            <li>{'What problem are you addressing??'}</li>
            <li>{'How are you solving this problem?'}</li>
            <li>{'What are your intended goals?'}</li>
          </ul>
        </>
      }
    >
      <ProjectCategoryForm />
    </TwoColumnLayout>
  );
};
