import { yupResolver } from '@hookform/resolvers/yup';
import { Transaction } from '@meshsdk/core';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { config } from 'src/config';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { DonateReq } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import Connect from 'src/modules/General/components/ConnectButton';
import * as yup from 'yup';

import { Form } from './index.types';

const schema = yup
  .object()
  .shape({
    donate: yup
      .string()
      .matches(/^(?!0(\.0+)?$)\d+(\.\d+)?$/, translate('vote-donate.enter-donation-positive-error'))
      .required(translate('vote-donate.error-donation-required-error')),
    preventDisplayName: yup.boolean().default(false),
    currency: yup.string().required(translate('vote-donate.error-donation-required-error')),
  })
  .required();

export const useDonateProject = (onDonate: (data: DonateReq) => void) => {
  const { ConnectButton, connected, wallet, address } = Connect();
  const [userImpactPoints, setUserImpactPoints ] = useState(0);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Form>({ mode: 'all', resolver: yupResolver(schema) });

  const donateValue = Number(watch('donate')) || 0;
  
  const [ donateValueConversion, setDonationValueConversion ] = useState(0);

  const selectedCurrency = CURRENCIES.find(currency => currency.value === watch('currency'));
  const selectedCurrencyLabel = selectedCurrency?.label;

  
  /* const sociousFee = 2;
  const donateWithFee = (sociousFee / 100) * donateValue; */
  const totalPay = donateValue;

  const initializeValues = useCallback(() => {
    const initialVal = {
      donate: '',
      preventDisplayName: false,
      currency: CURRENCIES[0].value,
    };
    reset(initialVal);
  }, [reset]);

  useEffect(() => {
    initializeValues();
  }, [initializeValues]);

  useEffect(() => {
    selectedCurrency?.rateConversionFunc(donateValue).then(r => {
      setDonationValueConversion(r)
      setUserImpactPoints(Math.round(r));
    });
  }, [donateValue]);

  const onSelectCurrency = (value: string) => setValue('currency', value, { shouldValidate: true });

  const onPreventDisplayName = (checked: boolean) => setValue('preventDisplayName', checked);

  const onSubmit = async (data: Form) => {
    if (!connected || !wallet) return;

    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      config.payoutDonationsAddress,
      `${BigInt(Math.round(Number(data.donate))) * 1000000n}`,
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    return onDonate({ ...data, transactionHash: txHash, wallet_address: address });
  };

  return {
    data: {
      userImpactPoints,
      register,
      errors,
      donateValue,
      totalPay,
      selectedCurrency,
      selectedCurrencyLabel,
      donateValueConversion,
      isConnected: connected,
      ConnectButton,
    },
    operations: { onSelectCurrency, onPreventDisplayName, handleSubmit, onSubmit },
  };
};
