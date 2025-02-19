import { translate } from "src/core/helpers/utils";
import NameDescriptionForm from "src/modules/CreateProject/containers/NameDescriptionForm";
import TwoColumnLayout from "src/modules/CreateProject/templates/TwoColumnLayout";

export const CreateProjectStep2 = () => {
  const verified = false;
  const description = (
    <>
      <p className="mb-3">
        Below are some questions to help you start writing. You can always edit
        it later:
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>Who are you and what are you raising funds for?</li>
        <li>Why is this cause important to you?</li>
        <li>How will the funds be used?</li>
      </ul>
    </>
  );
  return (
    <TwoColumnLayout
      title={"Tell donors why you're fundraising"}
      description={description}
      children={<NameDescriptionForm />}
      descriptionMode="html"
    />
  );
};
