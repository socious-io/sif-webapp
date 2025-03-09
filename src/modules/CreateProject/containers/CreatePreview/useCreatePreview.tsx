import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectAdaptor } from 'src/core/adaptors';
import { createProjects } from 'src/core/api';
import { RootState } from 'src/store';

export const useCreatePreview = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const projectState = useSelector((state: RootState) => state.createProject);
  const { name, description, city, country, socialCause, coverImage, website } = projectState;

  const onPublish = async () => {
    try {
      const result = await createProjectAdaptor(projectState);
      console.log('DDDD', result);
      // const createdProject = await createProjects({
      //   title: name,
      //   description: description,
      //   status: 'DRAFT',
      //   city: 'string',
      //   country: 'string',
      //   social_cause: 'string',
      //   cover_id: null,
      //   wallet_address: 'string',
      //   wallet_env: 'string',
      //   website: 'string',
      // });
      // console.log(name, description, city, country, socialCause, coverImage, website, wallet);
      // setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const onCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/projects');
  };
  const navigateProjectDetails = () => navigate('/create/step-1');
  const goBack = () => navigate(-1);

  return {
    navigateProjectDetails,
    name,
    description,
    city,
    country,
    socialCause,
    coverImage,
    website,
    goBack,
    showSuccessModal,
    setShowSuccessModal,
    onPublish,
    onCloseModal,
  };
};
