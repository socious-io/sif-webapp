import { translate } from "src/core/helpers/utils";
import bg from "src/assets/images/create-hero.jpeg";
import Button from "src/modules/General/components/Button";
import AvatarLabelGroup from "src/modules/General/components/AvatarLabelGroup";
import Icon from "src/modules/General/components/Icon";
import Rating from "@mui/material/Rating";
import { useCreateProjectForm } from "./useCreateProjectForm";
import AvatarGroup from "src/modules/General/components/avatarGroup";
import { accounts } from "./statics";
const CreateProjectForm: React.FC = () => {
  const { navigateCreateProject } = useCreateProjectForm();
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 items-center max-w-[1280px] mx-auto px-4">
      <div className="w-full max-w-md">
        <h1 className="text-[60px] font-semibold leading-[72px] text-primary-900">
          Bring your project to life.
        </h1>
        <div className="mt-3xl">Apply in minutes and get funded!</div>
        <Button
          onClick={navigateCreateProject}
          customStyle="my-6xl"
          color="primary">
          Start a project
        </Button>

        <div className="flex">
          <AvatarGroup accounts={accounts} length={3} />
          <div className="flex flex-col ml-[16px]">
            <div className="flex">
              <Rating
                value={5}
                readOnly
                icon={
                  <Icon
                    name="star-filled"
                    className="mr-1 text-Warning-300"
                    fontSize={20}
                  />
                }
              />
              <span>5.0</span>
            </div>
            <span>from 200+ reviews</span>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-8 md:mt-0">
        <img
          src={bg}
          alt="Placeholder"
          className="w-full max-w-sm md:max-w-md object-cover min-w-[480px] md:min-w-[var(--width-sm,480px)]"
        />
      </div>
    </div>
  );
};

export default CreateProjectForm;
