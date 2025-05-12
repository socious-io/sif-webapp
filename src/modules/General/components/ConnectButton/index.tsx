import { BrowserWallet, Wallet } from '@meshsdk/core';
import { useState } from 'react';
import { translate } from 'src/core/helpers/utils';

import Button from '../Button';
import ChooseWalletModal from '../ChooseWalletModal';

const Connect = (defaultAddress = '') => {
  const [address, setAddress] = useState(defaultAddress);
  const [connected, setConnected] = useState(() => defaultAddress !== '');
  const [wallet, setWallet] = useState<BrowserWallet | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [availableWallets, setAvailableWallets] = useState<Wallet[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleClick = async () => {
    if (connected) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      const wallets = await BrowserWallet.getAvailableWallets();
      if (wallets.length < 1) {
        alert(translate('no-wallet-alert'));
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
    setIsModalOpen(false);
  };

  const handleDisconnect = () => {
    setWallet(null);
    setAddress('');
    setConnected(false);
    setIsDropdownOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setIsDropdownOpen(false);
  };

  const ConnectButton = () => (
    <div className="relative">
      <Button color="info" onClick={handleClick} block>
        {address ? `${address.slice(0, 5)}...${address.slice(-5)}` : translate('connect-wallet')}
      </Button>

      {connected && isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 bg-Base-White cursor-pointer rounded-md shadow-lg z-10">
          <button
            onClick={handleDisconnect}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {translate('disconnect')}
          </button>
          <button
            onClick={handleCopy}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {translate('copy-address')}
          </button>
        </div>
      )}

      <ChooseWalletModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        wallets={availableWallets}
        onWalletSelect={handleWalletSelect}
      />
    </div>
  );

  return {
    ConnectButton,
    address,
    connected,
    wallet,
  };
};

export default Connect;
