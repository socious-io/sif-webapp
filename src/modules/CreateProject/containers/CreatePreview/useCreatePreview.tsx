import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useCreatePreview = () => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const projectState = useSelector((state: RootState) => state.createProject);
  const { name, description, city, country, social_cause, cover_id, website } = projectState;
  const [newProjectId, setNewProjectId] = useState<string | null>(null);
  const onPublish = async () => {
    try {
      const result = await createProjectAdaptor(projectState);
      setNewProjectId(result.data?.id as string);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  const onCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/projects/${newProjectId}`);
  };
  const navigateProjectDetails = () => navigate('/create/step-1');
  const goBack = () => navigate(-1);

  return {
    navigateProjectDetails,
    name,
    description,
    city,
    country,
    social_cause,
    cover_id,
    website,
    goBack,
    showSuccessModal,
    setShowSuccessModal,
    onPublish,
    onCloseModal,
  };
};
