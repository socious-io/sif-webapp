import { useState } from 'react';
import { DonateReq } from 'src/core/adaptors';
import { CreditCardProps } from 'src/modules/General/components/CreditCard/index.types';
export const useFiatDonation = (onDonate: (data: DonateReq) => void) => {
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [card, setCard] = useState<CreditCardProps>();
  const [donation, setDonation] = useState('');
  const [preventDisplayName, setPreventDisplayName] = useState(false);

  const onSelectCard = card => {
    setCard(card);
  };

  const onSubmit = async () => {
    if (card && donation) {
      await onDonate({
        donate: Number(donation),
        preventDisplayName,
        type: 'FIAT',
        token: card.id,
        currency: 'USD',
      });
    }
  };

  const disabled = !card || donation.trim() === '';

  return {
    data: { openAddCardModal, card, disabled, donation, preventDisplayName },
    operations: { setOpenAddCardModal, onSelectCard, setDonation, onSubmit, setPreventDisplayName },
  };
};
