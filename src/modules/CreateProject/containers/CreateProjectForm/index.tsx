import Rating from '@mui/material/Rating';
import bg from 'src/assets/images/create-hero.jpeg';
import { translate } from 'src/core/helpers/utils';
import AvatarGroup from 'src/modules/General/components/avatarGroup';
import AvatarLabelGroup from 'src/modules/General/components/AvatarLabelGroup';
import Button from 'src/modules/General/components/Button';
import Icon from 'src/modules/General/components/Icon';

import { accounts } from './statics';
import { useCreateProjectForm } from './useCreateProjectForm';
const CreateProjectForm: React.FC = () => {
  const { navigateCreateProject } = useCreateProjectForm();
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 items-center max-w-[1280px] mx-auto px-4 pb-16">
      <div className="w-full max-w-md">
        <h1 className="text-[36px] md:text-[60px] font-semibold leading-[44px] md:leading-[72px] text-primary-900">
          {translate("create-project-title")}
        </h1>
        <div className="mt-3xl">{translate("create-project-subtitle")}</div>
        <Button onClick={navigateCreateProject} customStyle="my-6xl" color="primary">
          {translate("create-project-button")}
        </Button>
        <div className="flex">
          <AvatarGroup accounts={accounts} length={3} />
          <div className="flex flex-col ml-[16px]">
            <div className="flex">
              <Rating
                value={5}
                readOnly
                icon={<Icon name="star-filled" className="mr-1 text-Warning-300" fontSize={20} />}
              />
              <span>{translate("rating-score")}</span>
            </div>
            <span>{translate("rating-reviews")}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 md:mt-0 mx-4">
        <img src={bg} alt={translate("image-alt-placeholder")} className="w-full md:w-[592px] h-[540px] object-cover md:min-w-[592px] " />
      </div>
    </div>
  );
};

export default CreateProjectForm;
