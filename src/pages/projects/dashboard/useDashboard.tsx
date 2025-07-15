import { useNavigate } from 'react-router-dom';

export const useDashboard = () => {
  const navigate = useNavigate();
  const navigateCreate = () => navigate('/create');
  return {
    operations: {
      navigateCreate,
    },
  };
};
