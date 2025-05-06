import { BrowserWallet } from '@meshsdk/core';
import { useState } from 'react';
import Modal from 'src/modules/General/components/Modal';

const ChooseWalletModal = ({
  open,
  handleClose,
  wallets,
  onWalletSelect,
  confirmHeader = 'Connect Wallet',
  headerDivider = false,
  mobileCentered = true,
  ...props
}) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [walletInstance, setWalletInstance] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async walletName => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await BrowserWallet.enable(walletName);
      setWalletInstance(wallet);
      setSelectedWallet(walletName);
      const address = await wallet.getChangeAddress();
      onWalletSelect({ wallet, address, name: walletName });
      localStorage.setItem('selectedWallet', walletName);
      handleClose();
    } catch (err) {
      setError('Wallet connection failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      headerDivider={headerDivider}
      mobileCentered={mobileCentered}
      customStyle="max-w-[480px] py-1"
      {...props}
    >
      <div className="flex flex-col gap-4">
        <span className="text-xl font-semibold text-center">{confirmHeader}</span>
      </div>
      <div className="flex flex-col gap-4 my-4">
        {wallets.length > 0 ? (
          <div className="grid grid-cols-4 gap-1 justify-items-center py-2">
            {wallets.map(wallet => (
              <img
                key={wallet.name}
                src={wallet.icon}
                alt={wallet.name}
                className="w-10 h-10 cursor-pointer"
                onClick={() => connectWallet(wallet.name)}
              />
            ))}
          </div>
        ) : (
          <span className="text-base text-white text-center">
            No wallets detected. Please install a Cardano wallet extension.
          </span>
        )}
        {loading && <span className="text-base text-blue-500 text-center">Connecting...</span>}
        {error && <span className="text-base text-red-500 text-center">{error}</span>}
      </div>
    </Modal>
  );
};

export default ChooseWalletModal;
