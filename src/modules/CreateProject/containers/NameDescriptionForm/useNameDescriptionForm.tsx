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
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  website: yup.string().nullable(),
});

export const useNameDescriptionForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector((state: RootState) => state.createProject);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.name || '',
      description: project.description || '',
      website: project.website || null,
    },
  });
  const onSubmit = (data: FormData) => {
    const { name, description, website } = data;
    dispatch(setProjectData({ name, description, website }));
    navigateStep2();
  };

  const navigateStep2 = () => navigate('/create/step-3');

  const goBack = () => navigate(-1);

  const name = watch('name') || '';
  const description = watch('description') || '';
  const hasErrors = Object.keys(errors).length > 0 || !name || !description;

  return {
    navigateStep2,
    handleSubmit,
    onSubmit,
    errors,
    register,
    goBack,
    name,
    description,
    hasErrors,
  };
};
