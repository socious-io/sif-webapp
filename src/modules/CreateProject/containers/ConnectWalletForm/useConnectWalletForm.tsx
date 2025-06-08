import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Connect from 'src/modules/General/components/ConnectButton';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wallet_address } = useSelector((state: RootState) => state.createProject);
  const { ConnectButton, address } = Connect(wallet_address);
  const navigatePublish = () => navigate('/create/publish');
  const goBack = () => navigate('/create/step-6');

  useEffect(() => {
    dispatch(setProjectData({ wallet_address: address }));
  }, [address]);
  const isEnabled = !!address;
  return { navigatePublish, goBack, isEnabled, ConnectButton, wallet_address };
};
