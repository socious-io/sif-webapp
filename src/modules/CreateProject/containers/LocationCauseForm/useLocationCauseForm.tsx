import { useNavigate } from 'react-router-dom';

export const useLocationCauseForm = () => {
  const navigate = useNavigate();

  const navigateStep2 = () => navigate('/create/step-2');
  return { navigateStep2 };
};
