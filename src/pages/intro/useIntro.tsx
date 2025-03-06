import { useState } from 'react';
import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors/auth/index.adaptors';

export const useIntro = () => {
  const [selectedCard, setSelectedCard] = useState('user');

  const onContinue = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + '/oauth/socious');
    if (error) return;
    else if (data) window.location.href = data.url;
  };

  return {
    data: {
      selectedCard,
    },
    operations: {
      setSelectedCard,
      onContinue,
    },
  };
};
