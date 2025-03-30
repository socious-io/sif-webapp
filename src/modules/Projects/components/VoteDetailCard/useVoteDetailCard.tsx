import { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
  return { isShared, handleCopy };
};
