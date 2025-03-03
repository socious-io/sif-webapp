import { useLoaderData } from 'react-router-dom';
import { Project } from 'src/core/adaptors';

export const useDonationsList = () => {
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const donationsList = detail?.donations || [];

  return {
    data: {
      donationsList,
    },
  };
};
