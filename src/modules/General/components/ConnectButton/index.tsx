import { BrowserWallet } from '@meshsdk/core';
import { useState } from 'react';

import Button from '../Button';

const Connect = (defaultAddress = '') => {
  const [address, setAddress] = useState(defaultAddress);
  const [connected, setConnected] = useState(() => defaultAddress !== '');
  const [wallet, setWallet] = useState<BrowserWallet>();

  const onClick = async () => {
    const wallets = await BrowserWallet.getAvailableWallets();
    if (wallets.length < 1) {
      alert('no available wallet');
      return;
    }
    const w = await BrowserWallet.enable(wallets[0].name);
    setWallet(w);
    setAddress(await w.getChangeAddress());
    setConnected(true);
  };

  const ConnectButton: React.FC = () => (
    <Button color="info" onClick={onClick} block>
      {address ? `${address.slice(0, 5)}...${address.slice(-5)}` : 'Connect wallet'}
    </Button>
  );

  return {
    ConnectButton,
    address,
    connected,
    wallet,
  };
};

export default Connect;
