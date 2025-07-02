import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

interface FormData {
  title: string;
  description: string;
  website?: string | null;
  email?: string | null;
  linkedin?: string | null;
}

const schema = yup.object().shape({
  title: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  website: yup.string().url('Must be a valid URL').nullable(),
  email: yup.string().email('Must be a valid email').nullable(),
  linkedin: yup.string().url('Must be a valid LinkedIn URL').nullable(),
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
      title: project.title || '',
      description: project.description || '',
      website: project.website || '',
      email: project.email || '',
      linkedin: project.linkedin || '',
    },
  });
  const title = watch('title') || '';
  const description = watch('description') || '';
  const website = watch('website') || '';
  const email = watch('email') || '';
  const linkedin = watch('linkedin') || '';
  const hasErrors = !isValid;

  const goBack = () => {
    dispatch(setProjectData({ title, description, website, email, linkedin }));
    navigate('/create/step-1');
  };

  const nextStep = () => navigate('/create/step-3');

  const onSubmit = (data: FormData) => {
    const { title, description, website, email, linkedin } = data;
    dispatch(setProjectData({ title, description, website, email, linkedin }));
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
