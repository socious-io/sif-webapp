import { UTxO } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/provider';
import { Web3Wallet, EnableWeb3WalletOptions } from '@meshsdk/web3-sdk';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { config } from 'src/config';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { RootState } from 'src/store';
import { resetWalletState, setWalletState, TokensBalance } from 'src/store/reducers/wallet.reducer';

import { dialog } from '../dialog/dialog';
import { translate } from '../helpers/utils';

export const getTokensBalanceFormatted = (utxos: UTxO[]): TokensBalance => {
  const rawBalances = {};
  for (const utxo of utxos) {
    for (const { unit, quantity } of utxo.output.amount) {
      rawBalances[unit] = (rawBalances[unit] || 0n) + BigInt(quantity);
    }
  }

  const formattedBalances = {};
  for (const [unit, amount] of Object.entries(rawBalances)) {
    const currency = CURRENCIES.find(c => c.value === unit);
    const decimals = BigInt(currency?.decimals ?? 1n);
    const symbol = currency?.label;

    formattedBalances[unit] = {
      total: Number(amount) / Number(decimals),
      symbol,
    };
  }

  return formattedBalances;
};

export const useMeshWallet = (defaultAddress = '') => {
  const dispatch = useDispatch();
  const walletState = useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    const fetchBalanceForDefaultAddress = async () => {
      if (!defaultAddress || walletState.connected) return;

      try {
        const provider = new BlockfrostProvider(config.blockfrostProjectId);
        const utxos = await provider.fetchAddressUTxOs(defaultAddress);
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

  const initializeWallet = async (): Promise<Web3Wallet> => {
    try {
      const provider = new BlockfrostProvider(config.blockfrostProjectId);
      const options: EnableWeb3WalletOptions = {
        networkId: config.env === 'production' ? 1 : 0,
        projectId: config.meshProjectId,
        fetcher: provider,
        submitter: provider,
      };

      const wallet = await Web3Wallet.enable(options);
      dispatch(setWalletState({ wallet }));
      return wallet;
    } catch (err) {
      console.error('Failed to initialize wallet:', err);
      throw err;
    }
  };

  const handleCardano = async (cardanoWallet: Web3Wallet['cardano']) => {
    const address = await cardanoWallet.getChangeAddress();
    const utxos = await cardanoWallet.getUtxos();
    const balances = getTokensBalanceFormatted(utxos);

    dispatch(
      setWalletState({
        connected: true,
        address,
        balances,
      }),
    );
  };

  const handleConnect = async () => {
    try {
      const wallet = await initializeWallet();

      if (wallet.cardano) {
        await handleCardano(wallet.cardano);
      }
    } catch (err) {
      console.error('Connection error:', err);
      throw err;
    }
  };

  const handleDisconnect = async () => {
    await walletState.wallet?.disable();
    dispatch(resetWalletState());
  };

  return {
    ...walletState,
    cardanoWallet: walletState.wallet?.cardano,
    handleConnect,
    handleDisconnect,
  };
};
