import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

interface FormData {
  category: string;
  problem_statement: string;
  solution: string;
  goals?: string;
}

const schema = yup.object().shape({
  category: yup.string().required('Project category is required'),
  problem_statement: yup.string().required('Problem statement is required'),
  solution: yup.string().required('Solution is required'),
  goals: yup.string().optional(),
});

export const useProjectCategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.createProject);

  const {
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      category: project.category || '',
      problem_statement: project.problem_statement || '',
      solution: project.solution || '',
      goals: project.goals || '',
    },
  });

  const projectCategory = watch('category') || '';
  const problemStatement = watch('problem_statement') || '';
  const solution = watch('solution') || '';
  const keyDeliverablesGoals = watch('goals') || '';

  const goBack = () => navigate('/create/step-2');
  const nextStep = () => navigate('/create/step-4');

  const setProjectCategory = (newValue: { value: string; label: string } | null) => {
    setValue('category', newValue ? newValue.value : '', { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    const { category, problem_statement, solution, goals } = data;
    dispatch(
      setProjectData({
        category,
        problem_statement,
        solution,
        goals,
      }),
    );
    nextStep();
  };
  return {
    data: {
      errors,
      projectCategory,
      problemStatement,
      solution,
      keyDeliverablesGoals,
    },
    operations: {
      goBack,
      setValue,
      handleSubmit,
      onSubmit,
      setProjectCategory,
    },
  };
};
