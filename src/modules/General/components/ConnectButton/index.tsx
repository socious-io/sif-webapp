import { BrowserWallet } from '@meshsdk/core';
import { useState } from 'react';

import Button from '../Button';
import ChooseWalletModal from '../ChooseWalletModal';

const Connect = (defaultAddress = '') => {
  const [address, setAddress] = useState(defaultAddress);
  const [connected, setConnected] = useState(() => defaultAddress !== '');
  const [wallet, setWallet] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);

  const handleClick = async event => {
    if (connected) {
    } else {
      const wallets = await BrowserWallet.getAvailableWallets();
      if (wallets.length < 1) {
        return;
      }
      setAvailableWallets(wallets);
      setIsModalOpen(true);
    }
  };

  const handleWalletSelect = ({ wallet, address, name }) => {
    setWallet(wallet);
    setAddress(address);
    setConnected(true);
  };

  const ConnectButton = () => (
    <>
      <Button color="info" onClick={handleClick} block>
        {address ? `${address.slice(0, 5)}...${address.slice(-5)}` : 'Connect wallet'}
      </Button>

      <ChooseWalletModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        wallets={availableWallets}
        onWalletSelect={handleWalletSelect}
      />
    </>
  );

  return {
    ConnectButton,
    address,
    connected,
    wallet,
  };
};

export default Connect;
