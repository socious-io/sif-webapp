import Rating from '@mui/material/Rating';
import { useState } from 'react';
import bg from 'src/assets/images/create-hero.jpeg';
import { translate } from 'src/core/helpers/utils';
import AvatarGroup from 'src/modules/General/components/avatarGroup';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';
import KYB from 'src/modules/Verification/containers/KYB';

import { accounts } from './statics';
import { useCreateProjectForm } from './useCreateProjectForm';
const CreateProjectForm: React.FC = () => {
  const { openVerifyModal, setOpenVerifyModal, onCreate } = useCreateProjectForm();

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
      <KYB open={openVerifyModal} setOpen={setOpenVerifyModal} />
    </div>
  );
};

export default CreateProjectForm;
