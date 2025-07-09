import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { CardRadioButtonItem } from 'src/modules/General/components/CardRadioButton/index.types';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

import { locationOptions } from './statics';

export const useLocationCauseForm = () => {
  const navigate = useNavigate();
  const { city, country, social_cause, mode } = useSelector((state: RootState) => state.createProject);
  const [selectedCardId, setSelectedCardId] = useState(() =>
    city === '' && country === '' ? 'WOLRDWIDE' : 'COUNTRY_CITY',
  );
  const dispatch = useDispatch();
  const items = socialCausesToCategoryAdaptor();
  const options: CardRadioButtonItem[] = locationOptions.map(option => {
    return {
      id: option.id.toString(),
      value: option.value,
      title: option.title,
      disabled: false,
    };
  });

  useEffect(() => {
    if (selectedCardId === 'WOLRDWIDE') {
      dispatch(setProjectData({ city: '', country: '' }));
    }
  }, [selectedCardId]);

  const onSelectLocation = location => dispatch(setProjectData({ city: location.city, country: location.country }));
  const onSelectCauses = value => dispatch(setProjectData({ social_cause: value.length ? value[0].value : '' }));

  const navigateStep2 = () => navigate('/create/step-2');
  const goBack = () => navigate('/create');
  const isEnabled = social_cause !== '' && ((country !== '' && city !== '') || selectedCardId === 'WOLRDWIDE');
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
    social_cause,
    city,
    country,
  };
};
