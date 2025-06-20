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
  linkdin?: string | null;
}

const schema = yup.object().shape({
  title: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  website: yup.string().url('Must be a valid URL').nullable(),
  email: yup.string().email('Must be a valid email').nullable(),
  linkdin: yup.string().url('Must be a valid LinkedIn URL').nullable(),
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
      linkdin: project.linkdin || '',
    },
  });
  const description = watch('description') || '';
  const hasErrors = !isValid;

  const goBack = () => navigate('/create/step-1');

  const nextStep = () => navigate('/create/step-3');

  const onSubmit = (data: FormData) => {
    const { title, description, website, email, linkdin } = data;
    dispatch(setProjectData({ title, description, website, email, linkdin }));
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
