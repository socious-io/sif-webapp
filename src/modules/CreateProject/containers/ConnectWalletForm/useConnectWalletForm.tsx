import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dapp from 'src/dapp';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { chainId, isConnected, Web3Connect, account } = dapp.useWeb3();
  console.log(!!account);

  const navigatePublish = () => navigate('/create/publish');
  const goBack = () => navigate(-1);
  useEffect(() => {
    console.log(account);
    dispatch(setProjectData({ wallet: account }));
  }, [account]);
  const isEnabled = !!account;
  return { navigatePublish, goBack, Web3Connect, isEnabled };
};
