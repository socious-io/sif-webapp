import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Input from 'src/modules/General/components/Input';

import { useBudgetForm } from './useBudgetForm';

const BudgetForm: React.FC = () => {
  const {
    data: { register, errors, hasErrors },
    operations: { goBack, handleSubmit, onSubmit },
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
        <Input
          register={register}
          name="cost_beakdown"
          label="Cost breakdown*"
          placeholder="Give us an itemized breakdown of intended goals, deliverables..."
          customHeight="240px"
          errors={errors['cost_breakdown']?.message ? [errors['cost_breakdown']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="impact_assessment"
          label="Impact assessment* "
          placeholder="Allocate $1500 of your secured funds "
          type="number"
          required
          errors={errors['impact_assessment']?.message ? [errors['impact_assessment']?.message.toString()] : undefined}
        />
        <Input
          register={register}
          name="voluntery_contribution"
          label="Voluntary contribution to matching pool (optional)"
          placeholder="Contribute to the next round of Socious Fund"
          errors={
            errors['voluntary_contribution']?.message
              ? [errors['voluntary_contribution']?.message.toString()]
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
