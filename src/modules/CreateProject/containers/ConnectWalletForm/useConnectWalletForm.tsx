import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dapp from 'src/core/dapp';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { Web3Connect, account } = dapp.useWeb3();

  const navigatePublish = () => navigate('/create/publish');
  const goBack = () => navigate('/create/step-3');
  useEffect(() => {
    dispatch(setProjectData({ wallet_address: account }));
  }, [account]);
  const isEnabled = !!account;
  return { navigatePublish, goBack, Web3Connect, isEnabled };
};
