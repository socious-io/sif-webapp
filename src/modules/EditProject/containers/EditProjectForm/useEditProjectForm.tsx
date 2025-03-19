import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { editProjectAdaptor, socialCausesToCategoryAdaptor, uploadMediaAdaptor } from 'src/core/adaptors';
import { Project } from 'src/core/api';
import { Files } from 'src/modules/General/components/ProgressFileUploader/index.types';
import * as yup from 'yup';

import { FormData } from './index.types';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  website: yup.string().url('Must be a valid URL').nullable(),
  city: yup.string().required('Location is required'),
  country: yup.string().required('Location is required'),
  social_cause: yup.string().required('Social Cause is required'),
  cover_id: yup.string().nullable(),
  cover_url: yup.string().nullable(),
  wallet_address: yup.string().required(),
});
export const useEditProjectForm = () => {
  const { project } = useLoaderData() as { project: Project };
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
      cover_url: project.cover.url || '',
      cover_id: project.cover.id || '',
      wallet_address: project.wallet_address,
    },
  });
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState('');
  const items = socialCausesToCategoryAdaptor();
  const [attachments, setAttachments] = useState<Files[]>([]);

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      setValue('cover_id', data?.id as string);
      setValue('cover_url', data?.url as string);

      if (error) return;
      data && setAttachments([{ id: data.id, url: data.url }]);
    });
  };

  const onSelectLocation = ({ city, country }) => {
    setValue('city', city);
    setValue('country', country);
  };
  const onSelectCauses = value => setValue('social_cause', value.length ? value[0].label : '');

  const onSubmit = (formData: FormData) => {
    editProjectAdaptor({ ...project, ...formData });
  };

  const description = watch('description') || '';
  const imagePreview = watch('cover_url');

  const city = watch('city');
  const country = watch('country');
  const social_cause = watch('social_cause');
  const wallet_address = watch('wallet_address');

  const goBack = () => navigate(-1);
  return {
    goBack,
    items,
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
    attachments,
    onDropFiles,
  };
};
