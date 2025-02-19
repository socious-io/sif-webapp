import { translate } from "src/core/helpers/utils";
import CreateProjectForm from "src/modules/CreateProject/containers/CreateProjectForm";

export const CreateProject = () => {
  const verified = false;
  return (
    <div className="mt-[64px]">
      <CreateProjectForm />
    </div>
  );
};
