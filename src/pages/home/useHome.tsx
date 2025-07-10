import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/adaptors';
import { getDaysUntil } from 'src/core/helpers/date-converter';
import { RootState } from 'src/store';

export const useHome = () => {
  const round = useSelector((state: RootState) => state.round.round);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const isIdentityUser = currentIdentity?.type === 'users';
  const roundIsClosed = round && getDaysUntil(round.voting_end_at) <= 0;

  return { round, isIdentityUser, roundIsClosed };
};
