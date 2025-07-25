import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import RichTextEditor from 'src/modules/General/components/RichTextEditor';

import { useNameDescriptionForm } from './useNameDescriptionForm';

const NameDescriptionForm: React.FC = () => {
  const {
    data: { register, errors, description, hasErrors, descriptionLength, maxDescriptionLength },
    operations: { goBack, setValue, handleSubmit, onSubmit },
  } = useNameDescriptionForm();

  return (
    <div>
      <form className="flex flex-col items-stretch gap-8">
        <Input
          register={register}
          name="title"
          label={translate('project-name-label') + '*'}
          placeholder={translate('project-name-placeholder')}
          required
          errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="email"
          type="email"
          label="Email*"
          placeholder="Your project’s contact for communications"
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="linkedin"
          label="LinkedIn profile (optional)"
          placeholder="Your project’s LinkedIn profile"
          errors={errors['linkedin']?.message ? [errors['linkedin']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="website"
          label={translate('project-website-label')}
          placeholder={translate('project-website-placeholder')}
          errors={errors['website']?.message ? [errors['website']?.message.toString()] : undefined}
        />
        <div className="flex flex-col gap-2">
          <RichTextEditor
            register={register}
            name="description"
            label={translate('project-description-label') + '*'}
            placeholder={translate('project-description-placeholder')}
            value={description}
            setValue={setValue}
            errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
          />
          <p className="text-sm text-gray-500">
            {descriptionLength}/{maxDescriptionLength}
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3">
          <Button
            color="primary"
            block
            type="submit"
            disabled={hasErrors}
            customStyle="mt-12"
            onClick={handleSubmit(onSubmit)}
          >
            {translate('continue-button')}
          </Button>
          <Button color="secondary" block variant="text" onClick={goBack}>
            {translate('back-button')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NameDescriptionForm;
