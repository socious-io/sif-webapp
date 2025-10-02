import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Mesh } from 'src/core/wallet';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wallet_address } = useSelector((state: RootState) => state.createProject);
  const { address } = Mesh.useMeshWallet(wallet_address);

  useEffect(() => {
    dispatch(setProjectData({ wallet_address: address }));
  }, [address]);

  const navigatePublish = () => navigate('/create/publish');

  const goBack = () => navigate('/create/step-6');

  return { navigatePublish, goBack };
};
