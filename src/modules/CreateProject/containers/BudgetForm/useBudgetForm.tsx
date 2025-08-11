import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ImpactAssessmentType } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

interface FormData {
  total_requested_amount: number;
  cost_breakdown: string;
  impact_assessment_type: ImpactAssessmentType;
  impact_assessment: string;
  voluntery_contribution?: string;
}

const schema = yup.object().shape({
  total_requested_amount: yup
    .number()
    .typeError('Total amount must be a number')
    .positive('Total amount must be a positive number')
    .required('Total amount is required'),
  cost_breakdown: yup.string().required('Cost breakdown type is required'),
  impact_assessment_type: yup
    .mixed<ImpactAssessmentType>()
    .oneOf(['OPTION_A', 'OPTION_B'], 'Invalid impact assessment type')
    .required('Impact assessment type is required'),
  impact_assessment: yup.string().required('Impact assessment details are required'),
  voluntery_contribution: yup.string().optional(),
});

export const useBudgetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.createProject);
  const impactOptions = [
    {
      label: translate('project-assessment-type-option1'),
      value: 'OPTION_A',
    },
    {
      label: translate('project-assessment-type-option2'),
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
      cost_breakdown: project.cost_breakdown || '',
      impact_assessment_type: project.impact_assessment_type || 'OPTION_A',
      impact_assessment: project.impact_assessment || '',
      voluntery_contribution: project.voluntery_contribution || '',
    },
  });

  const hasErrors = !isValid;
  const costBreakdown = watch('cost_breakdown') || '';
  const impactAssessmentType = watch('impact_assessment_type') || 'OPTION_A';
  const impactAssessment = watch('impact_assessment') || '';
  const volunteryContribution = watch('voluntery_contribution') || '';

  const goBack = () => {
    const values = {
      total_requested_amount: watch('total_requested_amount'),
      cost_breakdown: watch('cost_breakdown'),
      impact_assessment: watch('impact_assessment'),
      voluntery_contribution: watch('voluntery_contribution'),
    };
    dispatch(setProjectData(values));
    navigate('/create/step-3');
  };
  const nextStep = () => navigate('/create/step-5');
  const onSubmit = (data: FormData) => {
    const {
      total_requested_amount,
      cost_breakdown,
      impact_assessment_type,
      impact_assessment,
      voluntery_contribution,
    } = data;
    dispatch(
      setProjectData({
        total_requested_amount,
        cost_breakdown,
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
      volunteryContribution,
    },
    operations: {
      goBack,
      handleSubmit,
      onSubmit,
      setValue,
    },
  };
};
