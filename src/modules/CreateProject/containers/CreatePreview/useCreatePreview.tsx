import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProjectAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { resetProject } from 'src/store/reducers/createProject.reducer';

export const useCreatePreview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const projectState = useSelector((state: RootState) => state.createProject);
  const { title, description, city, country, social_cause, cover_id, website, cover_url } = projectState;
  const [newProjectId, setNewProjectId] = useState<string | null>(null);

  const onPublish = async () => {
    try {
      const { data, error } = await createProjectAdaptor(projectState);
      if (!error && data) {
        setNewProjectId(data.id as string);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onCloseModal = () => {
    setShowSuccessModal(false);
    navigate(`/projects/${newProjectId}`);
    dispatch(resetProject());
  };

  const navigateProjectDetails = () => navigate('/create/step-1');

  const goBack = () => navigate(-1);

  return {
    navigateProjectDetails,
    title,
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
    cover_url,
  };
};
