import axios from 'axios';
import { config } from 'src/config';

export type CurrencyType = {
  label: string;
  value: string;
  decimals: bigint;
  icon?: string;
  rateConversionFunc: (amount: number) => Promise<number>;
  getRate: () => Promise<number>;
  fiatOrCrypto: 'fiat' | 'crypto';
};

export const CURRENCIES: CurrencyType[] = [
  {
    label: 'ADA',
    value: 'lovelace',
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    getRate: async () => {
      const cacheKey = 'ADA_RATE';
      const cacheExpireTime = 100 * 60 * 1000; // 100 minutes
      const cachedRate = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(`${cacheKey}_TIME`);
      const now = Date.now();
      if (cachedRate && cachedTime && Number(cachedTime) > now - cacheExpireTime) {
        return Number(cachedRate);
      }
      const api = config.rates.ada;
      try {
        const { status, data } = await axios.get(api);
        if (status !== 200) {
          return 1;
        }
        const rate = data?.data.rateUsd;
        localStorage.setItem(cacheKey, String(rate));
        localStorage.setItem(`${cacheKey}_TIME`, String(now));
        return rate;
      } catch (error) {
        console.error(error);
        return 1;
      }
    },
    rateConversionFunc: async function (amount: number) {
      const rate = await this.getRate();
      return Math.round(amount * rate * 100) / 100;
    },
  },
  {
    label: 'USDM',
    value: `c48cbb3d5e57ed56e276bc45f99ab39abe94e6cd7ac39fb402da47ad0014df105553444d`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
    getRate: async () => 1,
  },
  {
    label: 'DJED',
    value: `8db269c3ec630e06ae29f74bc39edd1f87c819f1056206e879a1cd61444a4544`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
    getRate: async () => 1,
  },
  {
    label: 'THANK',
    value: `bd8669352095ea280c834bad675525b3cefca1d3333fe6f6298e36320014df10534f43494f`,
    decimals: 1n,
    fiatOrCrypto: 'crypto',
    getRate: async () => 0.01,
    rateConversionFunc: async (amount: number) => amount / 100,
  },
  {
    label: 'USDA',
    value: `fe7c786ab321f41c654ef6c1af7b3250a613c24e4213e0425a7ae45655534441`,
    decimals: 1000000n,
    fiatOrCrypto: 'crypto',
    rateConversionFunc: async (amount: number) => amount,
    getRate: async () => 1,
  },
  {
    label: 'USD',
    value: 'USD',
    decimals: 1n,
    fiatOrCrypto: 'fiat',
    rateConversionFunc: async (amount: number) => amount,
    getRate: async () => 1,
  },
  {
    label: 'JPY',
    value: 'JPY',
    decimals: 1n,
    fiatOrCrypto: 'fiat',
    getRate: async () => {
      const cacheKey = 'JPY_RATE';
      const cacheExpireTime = 100 * 60 * 1000; // 100 minutes
      const cachedRate = localStorage.getItem(cacheKey);
      const cachedTime = localStorage.getItem(`${cacheKey}_TIME`);
      const now = Date.now();
      if (cachedRate && cachedTime && Number(cachedTime) > now - cacheExpireTime) {
        return Number(cachedRate);
      }

      try {
        const response = await axios.get(config.rates.fiat);
        if (response.status === 200 && response.data?.data) {
          const jpyRate = response.data.data.find(c => c.symbol === 'JPY').rateUsd;
          localStorage.setItem(cacheKey, String(jpyRate));
          localStorage.setItem(`${cacheKey}_TIME`, String(now));
          return jpyRate;
        }
      } catch (error) {
        console.warn('Failed to fetch JPY rate:', error);
        return 0.0065;
      }
    },
    rateConversionFunc: async function (amount: number) {
      const rate = await this.getRate();
      return parseFloat((rate * amount).toFixed(4));
    },
  },
];
