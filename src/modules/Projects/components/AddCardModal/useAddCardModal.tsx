import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { config } from 'src/config';
import { translate } from 'src/core/helpers/utils';

import { Card } from './index.types';

export const useAddCardModal = (open: boolean, handleClose: () => void, onSelectCard: (card: Card) => void) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [card, setCard] = useState<StripeCardElement | null>(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const style = {
    base: {
      color: '#32325D',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',
      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  useEffect(() => {
    loadStripe(config.stripePublicKey).then(s => setStripe(s));
  }, []);

  useEffect(() => {
    if (stripe && open) {
      const elements = stripe.elements();
      const cardElement = elements.create('card', { style, hidePostalCode: true });
      cardElement.mount('#card-element');
      setCard(cardElement);
      return () => {
        cardElement.unmount();
      };
    }
  }, [stripe, open]);

  const onSubmit = async () => {
    if (!card || !stripe) {
      setErrorMessage(translate('stripe-not-loaded'));
      setOpenErrorModal(true);
      return;
    }

    try {
      const { token, error } = await stripe.createToken(card);

      if (error) {
        setErrorMessage(error.message || translate('cont-failed'));
        setOpenErrorModal(true);
        return;
      }

      if (!token || !token.card) {
        setErrorMessage(translate('token-creation-failed'));
        setOpenErrorModal(true);
        return;
      }

      const cardMeta = token.card;
      const iconPath = `/icons/pay-icons/${cardMeta.brand?.toLowerCase().replaceAll(' ', '')}.svg`;

      const selectedCard = {
        id: token.id,
        name: cardMeta.brand,
        date: `${cardMeta.exp_month}/${cardMeta.exp_year?.toString().slice(-2)}`,
        cardNumber: cardMeta.last4 ? `**** **** **** ${cardMeta.last4}` : '',
        holderImage: <img src={iconPath} alt={`${cardMeta.brand}-card`} />,
      };

      onSelectCard(selectedCard);

      handleClose();
    } catch (err) {
      setErrorMessage(translate('unexpected-error'));
      setOpenErrorModal(true);
    }
  };

  return {
    data: { openErrorModal, errorMessage },
    operations: {
      onSubmit,
      setOpenErrorModal,
    },
  };
};
