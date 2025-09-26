import { Web3Wallet } from '@meshsdk/web3-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TokensBalance = Record<
  string,
  {
    total: number;
    symbol?: string;
  }
>;

export type WalletState = {
  wallet: Web3Wallet | null;
  connected: boolean;
  address: string;
  balances: TokensBalance | null;
};

const initialState: WalletState = {
  wallet: null,
  connected: false,
  address: '',
  balances: null,
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
