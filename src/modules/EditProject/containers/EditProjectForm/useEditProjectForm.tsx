import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { Project } from 'src/core/api';
import { CardRadioButtonItem } from 'src/modules/General/components/CardRadioButton/index.types';
import { ProjectDetail } from 'src/pages/projects/detail';
import { RootState } from 'src/store';
import { setProjectData, SocialCauseVal } from 'src/store/reducers/createProject.reducer';
import * as yup from 'yup';

import { locationOptions } from './statics';
interface FormData {
  name: string;
  description: string;
  website?: string | null | undefined;
  location: Location;
  socialCauses: SocialCauseVal[];
  image: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  website: yup.string().nullable().url('Must be a valid URL'),
  location: yup.string().required('Location is required'),
  socialCauses: yup.array().of(yup.string()).min(1, 'At least one social cause is required'),
  image: yup.string().url('Must be a valid URL').required('Image is required'),
});
export const useEditProjectForm = () => {
  const { project } = useLoaderData();

  console.log('detais : ', project);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: project.title || '',
      description: project.description || '',
      website: project.website || '',
      location: project.location || {
        city: 'Rashtak',
        countryCode: 'MK',
        label: '{"label":"Rashtak, North Macedonia","description":"UTC+01"}',
      },
      socialCauses: project.category ? [{ value: project.category, label: project.category }] : [],
      image: project.coverImg || '',
    },
  });

  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState('');
  const dispatch = useDispatch();
  const keyItems = Object.keys(SOCIAL_CAUSES);
  const items = keyItems.map(i => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].value };
  });

  const options: CardRadioButtonItem[] = locationOptions.map(option => {
    return {
      id: option.id,
      value: option.value,
      title: option.title,
      disabled: false,
    };
  });
  const onSelectLocation = (location: string) => console.log;
  const onSelectCauses = () => console.log;
  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };
  const description = watch('description') || '';
  const imagePreview = watch('image');
  console.log('the description', description);
  const goBack = () => navigate(-1);
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
  };
};
