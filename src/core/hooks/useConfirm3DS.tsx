import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { config } from 'src/config';

const useConfirm3DS = (
  open: boolean,
  handleClose: () => void,
  clientSecret: string,
  onSuccess: (paymentIntentId: string) => void,
) => {
  useEffect(() => {
    if (!open || !clientSecret) return;

    const confirm = async () => {
      const stripe = await loadStripe(config.stripePublicKey);
      if (!stripe) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        console.error(error.message);
        handleClose();
        return;
      }
      if (paymentIntent?.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
      handleClose();
    };

    confirm();
  }, [open, clientSecret]);
};

export default useConfirm3DS;
