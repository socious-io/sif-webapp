import { PROJECT_CATEGORIES } from 'src/constants/PROJECT_CATEGORIES';
import { OptionType } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import RichTextEditor from 'src/modules/General/components/RichTextEditor';
import SearchDropdown from 'src/modules/General/components/SearchDropdown';

import { useProjectCategoryForm } from './useProjectCategoryForm';

const ProjectCategoryForm: React.FC = () => {
  const {
    data: { errors, problemStatement, solution, keyDeliverablesGoals, projectCategory, isSubmitDisabled },
    operations: { goBack, setValue, handleSubmit, onSubmit, setProjectCategory },
  } = useProjectCategoryForm();

  return (
    <div>
      <form className="flex flex-col items-stretch gap-8">
        <SearchDropdown
          id="projectCategory"
          label={translate('project-track-label') + '*'}
          className="mb-5"
          placeholder={translate('project-track-placeholder')}
          options={PROJECT_CATEGORIES}
          isSearchable={false}
          onChange={value => setProjectCategory(value as OptionType)}
          value={PROJECT_CATEGORIES.find(opt => opt.value === projectCategory) || null}
          errors={errors['projectCategory']?.message ? [errors['projectCategory']?.message.toString()] : undefined}
        />
        <RichTextEditor
          name="problem_statement"
          label={translate('project-statement-label') + '*'}
          placeholder={translate('project-statement-placeholder')}
          value={problemStatement}
          setValue={setValue}
          errors={errors['problem_statement']?.message ? [errors['problem_statement']?.message.toString()] : undefined}
        />
        <RichTextEditor
          name="solution"
          label={translate('project-solution-label') + '*'}
          placeholder={translate('project-solution-placeholder')}
          value={solution}
          setValue={setValue}
          errors={errors['solution']?.message ? [errors['solution']?.message.toString()] : undefined}
        />
        <RichTextEditor
          name="goals"
          label={translate('project-goals-label') + '*'}
          placeholder={translate('project-goals-placeholder')}
          value={keyDeliverablesGoals}
          setValue={setValue}
          errors={errors['goals']?.message ? [errors['goals']?.message.toString()] : undefined}
        />
        <div className="flex flex-col items-stretch gap-3">
          <Button
            color="primary"
            block
            type="submit"
            disabled={isSubmitDisabled}
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

export default ProjectCategoryForm;
