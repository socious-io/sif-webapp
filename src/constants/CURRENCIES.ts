import axios from 'axios';
import { config } from 'src/config';

export type CurrencyType = {
  label: string;
  value: string;
  icon?: string;
  rateConversionFunc: (amount: number) => Promise<number>;
};

export const CURRENCIES: CurrencyType[] = [
  {
    label: 'ADA',
    value: 'lovelace',
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
        console.log(`Error ${status} in fetching ${api} to get ADA rate`);
        return amount;
      }
      localStorage.setItem(cacheKey, String(data?.data.rateUsd));
      localStorage.setItem(`${cacheKey}_TIME`, String(now));
      return Math.round(amount * data?.data.rateUsd * 100) / 100;
    },
  },
];
