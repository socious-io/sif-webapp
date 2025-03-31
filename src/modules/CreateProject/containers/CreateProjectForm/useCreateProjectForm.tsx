import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useCreateProjectForm = () => {
  const navigate = useNavigate();
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });

  const onCreate = () => {
    if (currentIdentity?.type === 'users') navigate('/create/select-identity');
    if (currentIdentity?.type === 'organizations') {
      if (currentIdentity.verified) navigate('/create/step-1');
      else setOpenVerifyModal(true);
    }
  };

  return { openVerifyModal, setOpenVerifyModal, onCreate };
};
