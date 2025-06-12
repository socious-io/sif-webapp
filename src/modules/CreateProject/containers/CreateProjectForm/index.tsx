import bg from 'src/assets/images/create-hero.jpeg';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import ConfirmModal from 'src/modules/General/components/ConfirmModal';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';

import { useCreateProjectForm } from './useCreateProjectForm';

const CreateProjectForm: React.FC = () => {
  const {
    data: { submissionOverModal, openKybModal },
    operations: { onCreate, setSubmissionOverModal, setOpenKybModal, navigateKyb },
  } = useCreateProjectForm();

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 items-center max-w-[1280px] mx-auto px-4 pb-16">
      <div className="w-full max-w-md">
        <h1 className="text-[36px] md:text-[60px] font-semibold leading-11 md:leading-[72px] text-primary-900">
          {translate('create-project-title')}
        </h1>
        <div className="mt-3xl">{translate('create-project-subtitle')}</div>
        <Button onClick={onCreate} customStyle="my-6xl" color="primary">
          {translate('create-project-button')}
        </Button>
      </div>

      <div className="w-full flex justify-center mt-8 md:mt-0 mx-4">
        <img
          src={bg}
          alt={translate('image-alt-placeholder')}
          className="w-full md:w-[592px] h-[540px] object-cover md:min-w-[592px] "
        />
      </div>
      <ConfirmModal
        open={submissionOverModal}
        handleClose={() => setSubmissionOverModal(false)}
        confirmHeader={translate('submission-closed-header')}
        confirmSubheader={translate('submission-closed-subheader')}
        buttons={[
          {
            children: translate('submission-closed-button'),
            color: 'info',
            variant: 'outlined',
            onClick: () => setSubmissionOverModal(false),
            customStyle: 'w-full',
          },
        ]}
        customStyle="md:max-w-[400px]"
      />
      <ConfirmModal
        open={openKybModal}
        handleClose={() => setOpenKybModal(false)}
        icon={<FeaturedIcon type="light-circle-outlined" iconName="check-circle" theme="primary" size="lg" />}
        confirmHeader={translate('kyb.title')}
        confirmSubheader={translate('kyb.subtitle')}
        footerDivider
        customStyle="md:max-w-[480px]"
        footerClassName="flex-col pt-6"
        buttons={[
          {
            children: translate('kyb.continue'),
            color: 'primary',
            variant: 'contained',
            block: true,
            onClick: navigateKyb,
          },
          {
            children: translate('kyb.cancel'),
            color: 'secondary',
            variant: 'text',
            block: true,
            onClick: () => setOpenKybModal(false),
          },
        ]}
      />
    </div>
  );
};

export default CreateProjectForm;
