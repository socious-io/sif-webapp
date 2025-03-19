import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Connect from 'src/modules/General/components/ConnectButton';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ConnectButton, address, connected } = Connect();
  const navigatePublish = () => navigate('/create/publish');
  const goBack = () => navigate('/create/step-3');
  useEffect(() => {
    dispatch(setProjectData({ wallet_address: address }));
  }, [address]);
  const isEnabled = !!connected;
  return { navigatePublish, goBack, isEnabled, ConnectButton };
};
