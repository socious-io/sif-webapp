import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/adaptors';
import { switchAccount } from 'src/core/api/auth/auth.service';
import { RootState } from 'src/store';

export const useSelectIdentity = () => {
  const navigate = useNavigate();
  const organizations = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  }).filter(identity => identity.type === 'organizations');

  const onSelectIdentity = (id: string) => {
    switchAccount(id);
    navigate('/create');
  };

  return { organizations, onSelectIdentity };
};
