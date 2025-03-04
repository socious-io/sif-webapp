import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { CardRadioButtonItem } from 'src/modules/General/components/CardRadioButton/index.types';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

import { locationOptions } from './statics';

export const useLocationCauseForm = () => {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState('');
  const { location, socialCauses } = useSelector((state: RootState) => state.createProject);
  const dispatch = useDispatch();
  const keyItems = Object.keys(SOCIAL_CAUSES);
  const items = keyItems.map(i => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].value };
  });
  const options: CardRadioButtonItem[] = locationOptions.map(option => {
    return {
      id: option.id,
      value: option.value,
      title: option.title,
      disabled: false,
    };
  });

  const onSelectLocation = (location: string) => dispatch(setProjectData({ location }));
  const onSelectCauses = (socialCauses: string[]) => dispatch(setProjectData({ socialCauses }));

  const navigateStep2 = () => navigate('/create/step-2');
  const goBack = () => navigate(-1);
  const isEnabled = location !== null && socialCauses.length;
  return {
    navigateStep2,
    items,
    options,
    selectedCardId,
    setSelectedCardId,
    goBack,
    onSelectCauses,
    onSelectLocation,
    isEnabled,
    socialCauses,
  };
};
