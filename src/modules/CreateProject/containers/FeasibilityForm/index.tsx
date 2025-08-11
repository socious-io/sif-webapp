import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import RichTextEditor from 'src/modules/General/components/RichTextEditor';

import { useFeasibilityForm } from './useFeasibilityForm';

const FeasibilityForm: React.FC = () => {
  const {
    data: { register, errors, feasibility, isValid },
    operations: { goBack, setValue, handleSubmit, onSubmit },
  } = useFeasibilityForm();

  return (
    <div>
      <form className="flex flex-col items-stretch gap-8">
        <RichTextEditor
          register={register}
          name="feasibility"
          label={translate('project-feasibility-label') + '*'}
          placeholder={translate('project-feasibility-placeholder')}
          value={feasibility}
          setValue={setValue}
          errors={errors['feasibility']?.message ? [errors['feasibility']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="video"
          label={translate('project-video-label')}
          placeholder={translate('project-video-placeholder')}
          errors={errors['video']?.message ? [errors['video']?.message.toString()] : undefined}
        />
        <div className="flex flex-col items-stretch gap-3">
          <Button
            color="primary"
            block
            type="submit"
            customStyle="mt-12"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
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

export default FeasibilityForm;
