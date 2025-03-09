import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

interface FormData {
  name: string;
  description: string;
  website?: string | null;
}

const schema = yup.object().shape({
  name: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  website: yup.string().nullable(),
});

export const useNameDescriptionForm = () => {
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
      name: project.name || '',
      description: project.description || '',
      website: project.website || '',
    },
  });
  const description = watch('description') || '';
  const hasErrors = !isValid;

  const goBack = () => navigate('/create/step-1');

  const nextStep = () => navigate('/create/step-3');

  const onSubmit = (data: FormData) => {
    const { name, description, website } = data;
    dispatch(setProjectData({ name, description, website }));
    console.log(description, data);
    nextStep();
  };

  return {
    data: {
      register,
      errors,
      description,
      hasErrors,
    },
    operations: {
      goBack,
      setValue,
      handleSubmit,
      onSubmit,
    },
  };
};
