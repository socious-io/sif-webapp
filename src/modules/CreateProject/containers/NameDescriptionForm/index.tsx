import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';

import { useNameDescriptionForm } from './useNameDescriptionForm';

const NameDescriptionForm: React.FC = () => {
  const { handleSubmit, onSubmit, errors, register } = useNameDescriptionForm();
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

        <Input
          label="Description*"
          placeholder="Tell us more about your project"
          register={register}
          name="description"
          errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
          required
          multiline
        />

        <Button color="primary" block type="submit">
          Continue
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-[16px]">
          Cancel
        </Button>
      </form>
    </div>
  );
};
export default NameDescriptionForm;
