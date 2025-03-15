import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

export const useHome = () => {
  const round = useSelector((state: RootState) => state.round.round);
  return { round };
};
