import { BrowserWallet } from '@meshsdk/core';
import { useState } from 'react';

import Button from '../Button';

const Connect = () => {
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);

  const onClick = async () => {
    const wallets = await BrowserWallet.getAvailableWallets();
    if (wallets.length < 1) {
      alert('no available wallet');
      return;
    }
    const wallet = await BrowserWallet.enable(wallets[0].name);
    setAddress(await wallet.getChangeAddress());
    setConnected(true);
  };

  const ConnectButton: React.FC = () => (
    <Button color={connected ? 'secondary' : 'info'} onClick={onClick} block>
      {connected ? `${address.slice(0, 5)}...${address.slice(-5)}` : 'Connect wallet'}
    </Button>
  );

  return {
    ConnectButton,
    address,
    connected,
  };
};

export default Connect;
