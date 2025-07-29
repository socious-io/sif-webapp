import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import { config } from 'src/config';

const useConfirm3DS = (
  open: boolean,
  handleClose: () => void,
  clientSecret: string,
  onSuccess: (paymentIntentId: string) => void,
  onError: (message: string) => void,
) => {
  useEffect(() => {
    if (!open || !clientSecret) return;

    const confirm = async () => {
      try {
        const stripe = await loadStripe(config.stripePublicKey);
        if (!stripe) throw new Error('Stripe failed to load');

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret);

        if (error) {
          throw new Error(error.message || 'Failed to confirm 3DS payment');
        }

        if (paymentIntent?.status === 'succeeded') {
          onSuccess(paymentIntent.id);
        }
      } catch (err: any) {
        onError(err.message || 'An unexpected error occurred');
      } finally {
        handleClose();
      }
    };

    confirm();
  }, [open, clientSecret]);
};

export default useConfirm3DS;
