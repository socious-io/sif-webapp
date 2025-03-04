import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import TiptapEditor from 'src/modules/General/components/RichTextEditor';

import { useNameDescriptionForm } from './useNameDescriptionForm';

const NameDescriptionForm: React.FC = () => {
  const { handleSubmit, onSubmit, errors, register, goBack, hasErrors, watch, setValue } = useNameDescriptionForm();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Project name*"
          placeholder="What is your project name?"
          register={register}
          name="name"
          errors={errors['projectName']?.message ? [errors['projectName']?.message.toString()] : undefined}
          required
        />
        <div className="my-[32px]">
          <Input
            label="Website (optional)"
            placeholder="You project’s website if you have one"
            register={register}
            name="website"
            errors={errors['website']?.message ? [errors['website']?.message.toString()] : undefined}
          />
        </div>
        <TiptapEditor
          placeholder="Enter a description..."
          value={watch('description')}
          setValue={setValue}
          label="Project description*"
          errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
        />

        <Button color="primary" block type="submit" disabled={hasErrors} customStyle="mt-[48px]">
          Continue
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-[16px]" onClick={goBack}>
          Back
        </Button>
      </form>
    </div>
  );
};
export default NameDescriptionForm;
