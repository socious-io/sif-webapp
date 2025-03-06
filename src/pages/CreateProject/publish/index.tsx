import { translate } from 'src/core/helpers/utils';
import CreatePreview from 'src/modules/CreateProject/containers/CreatePreview';
import TwoColumnLayout from 'src/modules/CreateProject/templates/TwoColumnLayout';

export const Publish = () => {
  return (
    <TwoColumnLayout title={translate('publish-title')} description={translate('publish-description')}>
      <CreatePreview />
    </TwoColumnLayout>
  );
};
