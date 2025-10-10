import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CURRENCIES } from 'src/constants/CURRENCIES';

export const useVoteDetailCard = () => {
  const [isShared, setIsShared] = useState(false);
  const location = useLocation();
  const handleCopy = async () => {
    try {
      const currentUrl = window.location.origin + location.pathname;

      await navigator.clipboard.writeText(currentUrl);

      setIsShared(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getCurrencyLabel = (currencyValue: string) => {
    const currency = CURRENCIES.find(c => c.value === currencyValue);
    return currency?.label || currencyValue;
  };

  return { isShared, handleCopy, getCurrencyLabel };
};
