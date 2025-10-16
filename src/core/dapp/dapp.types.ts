export interface Token {
  name: string;
  symbol: string;
  address?: string;
  decimals?: number;
}

export interface Network {
  name: string;
  escrow: string;
  old?: boolean;
  logic?: string;
  tokens: Token[];
}

export type TokensBalance = Record<
  string,
  {
    total: number;
    symbol?: string;
  }
>;
