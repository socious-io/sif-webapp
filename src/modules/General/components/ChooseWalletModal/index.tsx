import { BrowserWallet } from '@meshsdk/core';
import { useState } from 'react';
import Modal from 'src/modules/General/components/Modal';
import { string } from 'yup';

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
  const [error, setError] = useState(null);

  const connectWallet = async walletName => {
    setError(null);
    try {
      const wallet = await BrowserWallet.enable(walletName);
      const address = await wallet.getChangeAddress();
      onWalletSelect({ wallet, address, name: walletName });
      localStorage.setItem('selectedWallet', walletName);
      handleClose();
    } catch (err: any) {
      if (err?.message) setError(err.message);
      console.error(err);
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
        {wallets.length > 0 && (
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
        )}
        {error && <span className="text-base text-red-500 text-center">{error}</span>}
      </div>
    </Modal>
  );
};

export default ChooseWalletModal;
