import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

interface FormData {
  feasibility: string;
  video?: string;
}

const schema = yup.object().shape({
  feasibility: yup.string().required(),
  video: yup.string().optional(),
});

export const useFeasibilityForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.createProject);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      feasibility: project.feasibility || '',
      video: project.video || '',
    },
  });

  const feasibility = watch('feasibility') || '';
  const video = watch('video') || '';
  const hasErrors = !isValid;

  const goBack = () => {
    dispatch(setProjectData({ feasibility, video }));
    navigate('/create/step-4');
  };
  const nextStep = () => navigate('/create/step-6');

  const onSubmit = (data: FormData) => {
    const { feasibility, video } = data;
    dispatch(setProjectData({ feasibility, video }));
    nextStep();
  };

  return {
    data: {
      register,
      errors,
      feasibility,
      hasErrors,
      isValid,
    },
    operations: {
      goBack,
      setValue,
      handleSubmit,
      onSubmit,
    },
  };
};
