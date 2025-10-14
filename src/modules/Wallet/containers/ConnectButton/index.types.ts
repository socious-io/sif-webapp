import { Wallet } from '@meshsdk/core';

export interface ConnectButtonProps {
  showBalance?: boolean;
}

export type CardanoWallet = Wallet & { type: 'cardano' };
