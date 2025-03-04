import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import RichTextEditor from 'src/modules/General/components/RichTextEditor';

import { useNameDescriptionForm } from './useNameDescriptionForm';

const NameDescriptionForm: React.FC = () => {
  const {
    data: { register, errors, description, hasErrors },
    operations: { goBack, setValue, handleSubmit, onSubmit },
  } = useNameDescriptionForm();

  return (
    <div>
      <form className="flex flex-col items-stretch gap-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="name"
          label="Project name*"
          placeholder="What is your project name?"
          required
          errors={errors['name']?.message ? [errors['name']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="website"
          label="Website (optional)"
          placeholder="You project’s website if you have one"
          errors={errors['website']?.message ? [errors['website']?.message.toString()] : undefined}
        />
        <RichTextEditor
          register={register}
          name="description"
          label="Project description*"
          placeholder="Enter a description..."
          value={description}
          setValue={setValue}
          errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
        />
        <div className="flex flex-col items-stretch gap-3">
          <Button color="primary" block type="submit" disabled={hasErrors} customStyle="mt-12">
            Continue
          </Button>
          <Button color="secondary" block variant="text" onClick={goBack}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};
export default NameDescriptionForm;
