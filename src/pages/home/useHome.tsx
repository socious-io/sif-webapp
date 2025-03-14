import { useLoaderData } from 'react-router-dom';
import { Round } from 'src/core/api';

export const useHome = () => {
  const { rounds: roundsdetails } = useLoaderData() as { rounds: Round };
  return {
    roundsdetails,
  };
};
