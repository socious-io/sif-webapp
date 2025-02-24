import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
    navigateStep2();
  };
  const navigateStep2 = () => navigate('/create/step-3');
  return { navigateStep2, handleSubmit, onSubmit, errors, register };
};
