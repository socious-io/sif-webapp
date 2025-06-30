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
  impact_assessment_type: 'OPTION_A' | 'OPTION_B';
  impact_assessment: string;
  voluntery_contribution?: string;
}

const schema = yup.object().shape({
  total_requested_amount: yup
    .number()
    .nullable()
    .typeError('Total amount must be a number')
    .positive('Total amount must be a positive number')
    .required('Total amount is required'),
  cost_breakdown: yup.string(),
  impact_assessment_type: yup.string().required('Impact assessment type is required'),
  impact_assessment: yup.string().required('Impact assessment details are required'),
  voluntery_contribution: yup.string().optional(),
});

export const useBudgetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.createProject);
  const impactOptions = [
    {
      label: 'Option A: Request Socious to conduct impact assessment - $1500',
      value: 'OPTION_A',
    },
    {
      label: 'Option B: Use a certified impact accountant',
      value: 'OPTION_B',
    },
  ];
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      total_requested_amount: project.total_requested_amount,
      cost_beakdown: project.cost_beakdown || '',
      impact_assessment_type: project.impact_assessment_type || 'OPTION_A',
      impact_assessment: project.impact_assessment || '',
      voluntery_contribution: project.voluntery_contribution || '',
    },
  });

  const hasErrors = !isValid;
  const costBreakdown = watch('cost_beakdown') || '';
  const impactAssessmentType = watch('impact_assessment_type') || '';
  const impactAssessment = watch('impact_assessment') || '';

  const goBack = () => {
    const values = {
      total_requested_amount: watch('total_requested_amount'),
      cost_beakdown: watch('cost_beakdown'),
      impact_assessment: watch('impact_assessment'),
      voluntery_contribution: watch('voluntery_contribution'),
    };
    dispatch(setProjectData(values));
    navigate('/create/step-3');
  };
  const nextStep = () => navigate('/create/step-5');
  const onSubmit = (data: FormData) => {
    const { total_requested_amount, cost_beakdown, impact_assessment_type, impact_assessment, voluntery_contribution } =
      data;
    dispatch(
      setProjectData({
        total_requested_amount,
        cost_beakdown,
        impact_assessment_type,
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
      costBreakdown,
      impactAssessmentType,
      impactAssessment,
      impactOptions,
    },
    operations: {
      goBack,
      handleSubmit,
      onSubmit,
      setValue,
    },
  };
};
