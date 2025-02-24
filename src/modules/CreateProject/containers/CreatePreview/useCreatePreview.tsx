import { useNavigate } from 'react-router-dom';

export const useCreatePreview = () => {
  const navigate = useNavigate();

  const navigateCreateProject = () => navigate('/create/step-1');
  return { navigateCreateProject };
};
