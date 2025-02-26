import { useNavigate } from 'react-router-dom';
import dapp from 'src/dapp';

export const useConnectWalletForm = () => {
  const navigate = useNavigate();
  const { chainId, isConnected, Web3Connect, account } = dapp.useWeb3();
  console.log(!!account);

  const navigatePublish = () => navigate('/create/publish');
  const goBack = () => navigate(-1);
  const isEnabled = !!account;
  return { navigatePublish, goBack, Web3Connect, isEnabled };
};
