import { useEffect, useState } from 'react';
import { Donate, getProjectDonationsAdaptor } from 'src/core/adaptors';

export const useDonationsList = projectId => {
  const [donationsList, setDonationsList] = useState<Donate[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getProjectDonationsAdaptor(projectId);
      data && setDonationsList(data);
    };
    fetchData();
  }, []);
  return {
    data: {
      donationsList,
    },
  };
};
