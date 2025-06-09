import { translate } from 'src/core/helpers/utils';
import FeasibilityForm from 'src/modules/CreateProject/containers/FeasibilityForm';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const CreateProjectStep5 = () => {
  return (
    <TwoColumnLayout
      title={'Tell donors why you are qualified to implement this project'}
      description={
        <>
          <p className="mb-3">{'Below are some questions to help you start writing. You can always edit it later:'}</p>
          <ul className="list-disc list-inside space-y-2">
            <li>{'What skills and expertise do you and your team bring to this project?'}</li>
            <li>{'We encourage you to upload a short video introducing your project and your team.'}</li>
          </ul>
        </>
      }
    >
      <FeasibilityForm />
    </TwoColumnLayout>
  );
};
