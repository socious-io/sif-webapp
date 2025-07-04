import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { editProjectAdaptor, socialCausesToCategoryAdaptor, uploadMediaAdaptor } from 'src/core/adaptors';
import { Project } from 'src/core/api';
import Connect from 'src/modules/General/components/ConnectButton';
import { Files } from 'src/modules/General/components/ProgressFileUploader/index.types';
import * as yup from 'yup';

import { FormData } from './index.types';

const schema = yup.object().shape({
  title: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  website: yup.string().url('Must be a valid URL').nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  social_cause: yup.string().required('Social Cause is required'),
  cover_id: yup.string().nullable(),
  cover_url: yup.string().nullable(),
  wallet_address: yup.string(),
  email: yup.string().email('Must be a valid email').nullable(),
  linkedin: yup.string().url('Must be a valid LinkedIn URL').nullable(),
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
      title: project.title || '',
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
  const [attachments, setAttachments] = useState<Files[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uneditedAttachment, setUneditedAttachment] = useState<File | null>(null);
  const { ConnectButton, address } = Connect();

  const onDropFiles = async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const file = newFiles[0];
      setUneditedAttachment(file);
      setShowEditModal(true);
    }
  };

  const handleEditComplete = async (editedFile: File) => {
    const { error, data } = await uploadMediaAdaptor(editedFile);
    if (!error && data) {
      setValue('cover_id', data.id);
      setValue('cover_url', data.url);
      setAttachments([{ id: data.id, url: data.url, name: editedFile.name }]);
    }
    setUneditedAttachment(null);
    setShowEditModal(false);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setUneditedAttachment(null);
  };

  const onSelectLocation = ({ city, country }) => {
    setValue('city', city);
    setValue('country', country);
  };

  const onSelectCauses = value => setValue('social_cause', value.length ? value[0].label : '');

  const onSubmit = async (formData: FormData) => {
    await editProjectAdaptor({ ...project, ...formData });
    navigate(`/projects/${project.id}`);
  };
  useEffect(() => {
    if (address) {
      setValue('wallet_address', address);
    }
  }, [address]);

  const description = watch('description') || '';
  const imagePreview = watch('cover_url');
  const city = watch('city');
  const country = watch('country');
  const social_cause = watch('social_cause');
  const wallet_address = watch('wallet_address');

  const goBack = () => navigate(-1);

  return {
    goBack,
    items: socialCausesToCategoryAdaptor(),
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
    showEditModal,
    handleModalClose,
    uneditedAttachment,
    handleEditComplete,
    ConnectButton,
  };
};
