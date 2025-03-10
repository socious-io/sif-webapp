import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { editProjectAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { Project } from 'src/core/api';
import { CardRadioButtonItem } from 'src/modules/General/components/CardRadioButton/index.types';
import * as yup from 'yup';

import { locationOptions } from './statics';
interface FormData {
  name: string;
  description: string;
  website?: string | null | undefined;
  city: string;
  country: string;
  social_cause: string;
  cover_id: string;
  wallet_address: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  website: yup.string().nullable('Must be a valid URL'),
  city: yup.string().required('Location is required'),
  country: yup.string().required('Location is required'),
  social_cause: yup.string().required('Social Cause is required'),
  cover_id: yup.string().nullable(),
  wallet_address: yup.string().required(),
});
export const useEditProjectForm = () => {
  const { project } = useLoaderData() as { project: Project };

  console.log('detais : ', project);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.title || '',
      description: project.description || '',
      website: project.website || '',
      city: project.city,
      country: project.country,
      social_cause: project.social_cause,
      cover_id: project.cover_id || '',
      wallet_address: project.wallet_address,
    },
  });

  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState('');
  const items = socialCausesToCategoryAdaptor();

  const options: CardRadioButtonItem[] = locationOptions.map(option => {
    return {
      id: option.id,
      value: option.value,
      title: option.title,
      disabled: false,
    };
  });
  const onSelectLocation = ({ city, country }) => {
    setValue('city', city);
    setValue('country', country);
  };
  const onSelectCauses = value => setValue('social_cause', value.length ? value[0].label : '');

  const onSubmit = (formData: FormData) => {
    console.log('alskdfjalksdjflksj');
    editProjectAdaptor({ ...project, ...formData });
  };

  const description = watch('description') || '';
  const imagePreview = watch('cover_id');
  const city = watch('city');
  const country = watch('country');
  const social_cause = watch('social_cause');
  const wallet_address = watch('wallet_address');

  console.log('the description', description);
  const goBack = () => navigate(-1);
  console.log(errors);
  return {
    goBack,
    items,
    options,
    selectedCardId,
    setSelectedCardId,
    onSelectCauses,
    onSelectLocation,
    register,
    handleSubmit,
    description,
    setValue,
    watch,
    imagePreview,
    onSubmit,
    city,
    country,
    social_cause,
    errors,
    wallet_address,
  };
};
