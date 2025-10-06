import { yupResolver } from '@hookform/resolvers/yup';
import { Transaction } from '@meshsdk/core';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { config } from 'src/config';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { DonateReq } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import { Mesh } from 'src/core/wallet';
import * as yup from 'yup';

import { Form } from './index.types';

const schema = yup
  .object()
  .shape({
    donate: yup
      .number()
      .typeError(translate('vote-donate.enter-donation-positive-error'))
      .positive(translate('vote-donate.enter-donation-positive-error'))
      .integer(translate('vote-donate.enter-donation-positive-error'))
      .required(translate('vote-donate.error-donation-required-error')),
    preventDisplayName: yup.boolean().default(false),
    currency: yup.string().required(translate('vote-donate.error-donation-required-error')),
  })
  .required();

export const useDonateProject = (onDonate: (data: DonateReq) => void) => {
  const { connected, cardanoWallet: wallet, address } = Mesh.useMeshWallet();
  const [donateValueConversion, setDonationValueConversion] = useState(0);
  const [userImpactPoints, setUserImpactPoints] = useState(0);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Form>({ mode: 'all', resolver: yupResolver(schema) });
  const selectedCurrencyValue = watch('currency');
  const selectedCurrency = CURRENCIES.find(currency => currency.value === selectedCurrencyValue);

  const selectedCurrencyLabel = selectedCurrency?.label;
  const donateValue = watch('donate') || 0;
  const anonymous = watch('preventDisplayName');
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // FIXME: socious fee later added to donate value
  // const sociousFee = 2;
  // const donateWithFee = (sociousFee / 100) * donateValue;
  const totalPay = donateValue;

  const initializeValues = useCallback(() => {
    const initialVal = {
      donate: undefined,
      preventDisplayName: false,
      currency: CURRENCIES[0].value,
    };
    reset(initialVal);
  }, [reset]);

  useEffect(() => {
    initializeValues();
  }, [initializeValues]);

  useEffect(() => {
    if (!selectedCurrency?.rateConversionFunc) return;

    const fetchConversion = async () => {
      const convertedValue = await selectedCurrency.rateConversionFunc(donateValue);
      setDonationValueConversion(convertedValue);
      setUserImpactPoints(Math.round(convertedValue));
    };

    fetchConversion();
  }, [donateValue, selectedCurrency]);

  const onSelectCurrency = (value: string) => setValue('currency', value, { shouldValidate: true });

  const onPreventDisplayName = (checked: boolean) => setValue('preventDisplayName', checked);

  const onSubmit = async (data: Form) => {
    // if (currentIdentity?.verified) {
    if (!connected || !wallet || !selectedCurrency) return;

    let txHash = '';
    const isSpecialEvent = !!config.activeEvent;
    const isSpecialAmount = selectedCurrency.value === 'lovelace' && data.donate === 1;
    const rate = await selectedCurrency.rateConversionFunc(data.donate);

    if (isSpecialEvent && isSpecialAmount) {
      txHash = 'tech4impact2025';
    } else {
      const tx = new Transaction({ initiator: wallet });

      const amount = `${BigInt(data.donate) * selectedCurrency.decimals}`;
      if (selectedCurrency.value === 'lovelace') {
        tx.sendLovelace(config.payoutDonationsAddress, amount);
      } else {
        tx.sendAssets(config.payoutDonationsAddress, [
          {
            unit: selectedCurrency.value,
            quantity: amount,
          },
        ]);
      }

      try {
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        txHash = await wallet.submitTx(signedTx);
      } catch (error) {
        alert(error);
        return;
      }
    }

    return onDonate({ ...data, transactionHash: txHash, wallet_address: address, rate, anonymous });
    // } else setShowConfirmationModal(true);
  };

  const navigateToVerify = () => {
    window.open(config.accountCenterURL + '/verification', '_blank');
  };

  return {
    data: {
      userImpactPoints,
      register,
      errors,
      totalPay,
      selectedCurrency,
      selectedCurrencyLabel,
      donateValueConversion,
      isConnected: connected,
      // showConfirmationModal,
    },
    operations: {
      onSelectCurrency,
      onPreventDisplayName,
      handleSubmit,
      onSubmit,
      // setShowConfirmationModal,
      navigateToVerify,
    },
  };
};
