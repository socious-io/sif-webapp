import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokensBalance } from 'src/core/dapp/dapp.types';

export type WalletState = {
  wallet: any | null;
  address: string;
  connected: boolean;
  balances: TokensBalance | null;
  //For EVM Wallets
  chainId: number | null;
  // walletProvider: BrowserWallet | null;
  // provider: BrowserProvider | null;
  // signer: JsonRpcSigner | null;
  // network: any;
  // networkName: string;
  // testnet: boolean;
};

const initialState: WalletState = {
  wallet: null,
  address: '',
  connected: false,
  balances: null,
  //For EVM Wallets
  chainId: null,
  // walletProvider: null,
  // provider: null,
  // signer: null,
  // network: null,
  // networkName: '',
  // testnet: false,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletState(state, action: PayloadAction<Partial<WalletState>>) {
      return { ...state, ...action.payload };
    },
    resetWalletState() {
      return initialState;
    },
  },
});

export const { setWalletState, resetWalletState } = walletSlice.actions;
