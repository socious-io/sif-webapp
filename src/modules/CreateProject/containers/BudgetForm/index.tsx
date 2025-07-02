import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';
import { RadioGroup } from 'src/modules/General/components/RadioGroup';
import RichTextEditor from 'src/modules/General/components/RichTextEditor';

import { useBudgetForm } from './useBudgetForm';

const BudgetForm: React.FC = () => {
  const {
    data: {
      register,
      errors,
      hasErrors,
      costBreakdown,
      impactAssessmentType,
      impactAssessment,
      impactOptions,
      volunteryContribution,
    },
    operations: { goBack, handleSubmit, onSubmit, setValue },
  } = useBudgetForm();

  return (
    <div>
      <form className="flex flex-col items-stretch gap-8">
        <Input
          register={register}
          name="total_requested_amount"
          type="number"
          label="Total Amount Requested*"
          placeholder="Enter the total amount needed for your project"
          required
          errors={
            errors['total_requested_amount']?.message
              ? [errors['total_requested_amount']?.message.toString()]
              : undefined
          }
        />
        <RadioGroup
          contentClassName="text-sm"
          label="Impact Assessment Type*"
          name="impact_assessment_type"
          items={impactOptions}
          onChange={item =>
            setValue('impact_assessment_type', item.value as 'OPTION_A' | 'OPTION_B', { shouldValidate: true })
          }
          defaultValue={impactAssessmentType}
          errors={
            errors['impact_assessment_type']?.message
              ? [errors['impact_assessment_type']?.message.toString()]
              : undefined
          }
        />
        <RichTextEditor
          name="impact_assessment"
          label="Impact Assessment Details*"
          placeholder="Please describe your impact assessment choice and include relevant details, names..."
          value={impactAssessment}
          setValue={setValue}
          errors={errors['impact_assessment']?.message ? [errors['impact_assessment']?.message.toString()] : undefined}
        />
        <RichTextEditor
          name="cost_breakdown"
          label="Cost Breakdown*"
          placeholder="Give us an itemized breakdown of intended goals, deliverables..."
          value={costBreakdown}
          setValue={setValue}
          errors={errors['cost_breakdown']?.message ? [errors['cost_breakdown']?.message.toString()] : undefined}
        />
        <RichTextEditor
          name="voluntery_contribution"
          label="Voluntary Contribution to Matching Pool (Optional)"
          placeholder="Contribute to the next round of Socious Fund"
          value={volunteryContribution}
          setValue={setValue}
          errors={
            errors['voluntery_contribution']?.message
              ? [errors['voluntery_contribution']?.message.toString()]
              : undefined
          }
        />
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

export default BudgetForm;
