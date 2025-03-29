import { yupResolver } from '@hookform/resolvers/yup';
import { Transaction } from '@meshsdk/core';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { config } from 'src/config';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { DonateReq } from 'src/core/adaptors';
import { CurrentIdentity, UserMeta } from 'src/core/api';
import { translate } from 'src/core/helpers/utils';
import Connect from 'src/modules/General/components/ConnectButton';
import { RootState } from 'src/store';
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
  const { ConnectButton, connected, wallet, address } = Connect();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const isIdentityUser = currentIdentity?.type === 'users';
  const userImpactPoints = isIdentityUser ? (currentIdentity.meta as UserMeta).impact_points : undefined;
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Form>({ mode: 'all', resolver: yupResolver(schema) });
  const selectedCurrency = watch('currency');
  const selectedCurrencyLabel = CURRENCIES.find(currency => currency.value === selectedCurrency)?.label;
  const donateValue = watch('donate') || 0;
  //FIXME: convert selected currency to $ (for now 1 -> 1)
  const donateValueConversion = donateValue;
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

  const onSelectCurrency = (value: string) => setValue('currency', value, { shouldValidate: true });

  const onPreventDisplayName = (checked: boolean) => setValue('preventDisplayName', checked);

  const onSubmit = async (data: Form) => {
    if (!connected || !wallet) return;

    const tx = new Transaction({ initiator: wallet }).sendLovelace(
      config.payoutDonationsAddress,
      `${BigInt(data.donate) * 1000000n}`,
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
