import axios from 'axios';
import { config } from 'src/config';

export type CurrencyType = {
  label: string;
  value: string;
  decimals: bigint;
  icon?: string;
  rateConversionFunc: (amount: number) => Promise<number>;
  fiatOrCrypto: 'fiat' | 'crypto';
};

export const CURRENCIES: CurrencyType[] = [
  {
    label: 'ADA',
    value: 'lovelace',
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => {
      const cacheKey = 'ADA_RATE';
      const cacheExpireTime = 10 * 60 * 1000; // 10 minutes
      const cachedRate = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(`${cacheKey}_TIME`);
      const now = Date.now();
      if (cachedRate && cachedTime && Number(cachedTime) > now - cacheExpireTime) {
        return Math.round(amount * Number(cachedRate) * 100) / 100;
      }

      const api = config.rates.ada;
      const { status, data } = await axios.get(api);
      if (status !== 200) {
        return amount;
      }
      localStorage.setItem(cacheKey, String(data?.data.rateUsd));
      localStorage.setItem(`${cacheKey}_TIME`, String(now));
      return Math.round(amount * data?.data.rateUsd * 100) / 100;
    },
  },
  {
    label: 'USDM',
    value: `c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
  },
  {
    label: 'DJED',
    value: `8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61444a4544`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
  },
  {
    label: 'SOCIO',
    value: `bd8669352095ea280c834bad675525b3cefca1d3333fe6f6298e36320014df10534f43494f`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
  },
  {
    label: 'USDA',
    value: `fe7c786ab321f41c654ef6c1af7b3250a613c24e4213e0425a7ae45655534441`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
  },
  {
    label: 'USD',
    value: 'USD',
    decimals: 100n,
    fiatOrCrypto: 'fiat',
    rateConversionFunc: async (amount: number) => amount,
  },
  {
    label: 'JPY',
    value: 'JPY',
    decimals: 100n,
    fiatOrCrypto: 'fiat',
    rateConversionFunc: async (amount: number) => {
      const cacheKey = 'JPY_RATE';
      const cacheExpireTime = 10 * 60 * 1000; // 10 minutes
      const cachedRate = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(`${cacheKey}_TIME`);
      const now = Date.now();
      if (cachedRate && cachedTime && Number(cachedTime) > now - cacheExpireTime) {
        return Math.round(amount * Number(cachedRate) * 100) / 100;
      }

      try {
        const response = await axios.get(config.rates.fiat);
        if (response.status === 200 && response.data?.rates?.JPY) {
          const jpyRate = response.data.rates.JPY;
          localStorage.setItem(cacheKey, String(jpyRate));
          localStorage.setItem(`${cacheKey}_TIME`, String(now));
          return Math.round(amount * jpyRate * 100) / 100;
        }
      } catch (error) {
        console.warn('Failed to fetch JPY rate:', error);
      }

      return Math.round(amount * 150 * 100) / 100;
    },
  },
];
