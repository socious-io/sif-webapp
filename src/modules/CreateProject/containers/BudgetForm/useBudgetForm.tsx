import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

interface FormData {
  total_requested_amount: number | null;
  cost_beakdown: string;
  impact_assessment: number | null;
  voluntery_contribution?: string;
}

const schema = yup.object().shape({
  total_requested_amount: yup
    .number()
    .typeError('Total amount must be a number')
    .positive('Total amount must be a positive number')
    .required('Total amount is required'),
  cost_beakdown: yup.string(),
  impact_assessment: yup
    .number()
    .typeError('Total amount must be a number')
    .positive('Total amount must be a positive number')
    .required('Total amount is required'),
  voluntery_contribution: yup.string().optional(),
});

export const useBudgetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.createProject);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      total_requested_amount: project.total_requested_amount || null,
      cost_beakdown: project.cost_beakdown || '',
      impact_assessment: project.impact_assessment || null,
      voluntery_contribution: project.voluntery_contribution || '',
    },
  });
  const hasErrors = !isValid;

  const goBack = () => navigate('/create/step-3');
  const nextStep = () => navigate('/create/step-5');
  const onSubmit = (data: FormData) => {
    const { total_requested_amount, cost_beakdown, impact_assessment, voluntery_contribution } = data;
    dispatch(
      setProjectData({
        total_requested_amount,
        cost_beakdown,
        impact_assessment,
        voluntery_contribution,
      }),
    );
    nextStep();
  };

  return {
    data: {
      register,
      errors,
      hasErrors,
    },
    operations: {
      goBack,
      handleSubmit,
      onSubmit,
    },
  };
};
