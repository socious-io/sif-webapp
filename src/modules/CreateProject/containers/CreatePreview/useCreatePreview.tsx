import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'src/store';

export const useCreatePreview = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { name, description, location, socialCauses, coverImage, website } = useSelector(
    (state: RootState) => state.createProject,
  );

  const navigateProjectDetails = () => navigate('/create/step-1');
  const goBack = () => navigate(-1);

  return {
    navigateProjectDetails,
    name,
    description,
    location,
    socialCauses,
    coverImage,
    website,
    goBack,
    showSuccessModal,
    setShowSuccessModal,
  };
};
