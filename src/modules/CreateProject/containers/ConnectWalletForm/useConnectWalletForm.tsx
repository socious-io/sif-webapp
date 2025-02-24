import { useNavigate } from 'react-router-dom';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();

  const navigatePublish = () => navigate('/create/publish');
  return { navigatePublish };
};
