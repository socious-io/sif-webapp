import { useEffect, useState } from 'react';

export const useProjectCard = (totalDonationsInUSD: number | undefined, totalRequestedAmount: number | undefined) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (totalDonationsInUSD !== undefined && totalRequestedAmount) {
      const percentage = (totalDonationsInUSD / totalRequestedAmount) * 100;
      setProgressValue(Math.min(percentage, 100));
    }
  }, [totalDonationsInUSD, totalRequestedAmount]);

  return {
    progressValue,
    raisedAmountUSD: totalDonationsInUSD || 0,
    targetAmount: totalRequestedAmount || 0,
  };
};
