import { BrowserWallet } from '@meshsdk/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { RootState } from 'src/store';
import { resetWalletState, setWalletState } from 'src/store/reducers/wallet.reducer';

import { fetchUtxos } from './dapp.service';
import { TokensBalance } from './dapp.types';
import { dialog } from '../dialog/dialog';
import { translate } from '../helpers/utils';

//For EVM Wallets
const WALLET_TYPES = {
  CARDANO: 'cardano',
} as const;

export const getTokensBalanceFormatted = (utxos): TokensBalance | null => {
  const rawBalances = {};
  for (const utxo of utxos) {
    const amounts = utxo.output?.amount ?? utxo.amount;
    for (const { unit, quantity } of amounts) {
      rawBalances[unit] = (rawBalances[unit] || 0n) + BigInt(quantity);
    }
  }

  if (Object.keys(rawBalances).length === 0) return null;

  const formattedBalances = {};
  for (const [unit, amount] of Object.entries(rawBalances)) {
    const currency = CURRENCIES.find(c => c.value === unit);
    const decimals = BigInt(currency?.decimals ?? 1n);
    const symbol = currency?.label;

    formattedBalances[unit] = {
      total: Number(amount) / Number(decimals) || 0,
      symbol,
    };
  }

  return formattedBalances;
};

export const useWeb3 = (defaultAddress = '') => {
  const dispatch = useDispatch();
  const walletState = useSelector((state: RootState) => state.wallet);

  const savedWallet = localStorage.getItem('selectedWallet');
  const savedType = localStorage.getItem('walletType');

  useEffect(() => {
    const fetchBalanceForDefaultAddress = async () => {
      if (!defaultAddress || walletState.connected) return;

      try {
        const utxos = await fetchUtxos(defaultAddress);
        const balances = getTokensBalanceFormatted(utxos);

        dispatch(
          setWalletState({
            address: defaultAddress,
            connected: true,
            balances,
          }),
        );
      } catch (err) {
        console.error('Error loading default address balance:', err);
        dialog.alert({ title: translate('wallet.failed'), message: translate('wallet.default-error') });
      }
    };

    fetchBalanceForDefaultAddress();
  }, [defaultAddress]);

  const setupCardanoConnection = async (name: string) => {
    try {
      const wallet = await BrowserWallet.enable(name);
      const address = await wallet.getChangeAddress();
      const utxos = await wallet.getUtxos();
      const balances = getTokensBalanceFormatted(utxos);

      dispatch(
        setWalletState({
          wallet,
          address,
          connected: true,
          balances,
          chainId: null,
        }),
      );
      localStorage.setItem('walletType', WALLET_TYPES.CARDANO);
      localStorage.setItem('selectedWallet', name);
    } catch (err) {
      console.error('Failed to connect Cardano wallet:', err);
    }
  };

  const disconnect = () => {
    dispatch(resetWalletState());
    localStorage.removeItem('walletType');
    localStorage.removeItem('selectedWallet');
  };

  useEffect(() => {
    if (!savedWallet) return;

    if (savedType === WALLET_TYPES.CARDANO) setupCardanoConnection(savedWallet);
  }, []);

  return {
    ...walletState,
    walletName: savedWallet,
    walletType: savedType,
    setupCardanoConnection,
    disconnect,
  };
};
