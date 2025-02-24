import { translate } from 'src/core/helpers/utils';
import CreatePreview from 'src/modules/CreateProject/containers/CreatePreview';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const Publish = () => {
  const verified = false;
  return (
    <TwoColumnLayout
      title={'Almost done! You’re ready to publish your project'}
      description={'Confirm your project details.'}
    >
      <CreatePreview />
    </TwoColumnLayout>
  );
};
