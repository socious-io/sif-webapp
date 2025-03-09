import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { CardRadioButtonItem } from 'src/modules/General/components/CardRadioButton/index.types';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

import { locationOptions } from './statics';

export const useLocationCauseForm = () => {
  const navigate = useNavigate();
  const [selectedCardId, setSelectedCardId] = useState('');
  const { city, country, socialCause } = useSelector((state: RootState) => state.createProject);
  const dispatch = useDispatch();
  const keyItems = Object.keys(SOCIAL_CAUSES);
  const items = socialCausesToCategoryAdaptor();
  const options: CardRadioButtonItem[] = locationOptions.map(option => {
    return {
      id: option.id,
      value: option.value,
      title: option.title,
      disabled: false,
    };
  });

  const onSelectLocation = location => dispatch(setProjectData({ city: location.city, country: location.country }));
  const onSelectCauses = value => dispatch(setProjectData({ socialCause: value.length ? value[0].label : '' }));

  const navigateStep2 = () => navigate('/create/step-2');
  const goBack = () => navigate(-1);
  const isEnabled = socialCause !== '' && ((country !== '' && city !== '') || selectedCardId === 'Worldwide');
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
    socialCause,
    city,
    country,
  };
};
