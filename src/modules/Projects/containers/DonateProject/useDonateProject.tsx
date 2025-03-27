import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { DonateReq } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import Connect from 'src/modules/General/components/ConnectButton';
import { RootState } from 'src/store';
import * as yup from 'yup';

import { Transaction } from '@meshsdk/core';
import { config } from 'src/config';

const schema = yup
  .object()
  .shape({
    donate: yup
      .string()
      .matches(/^(?!0(\.0+)?$)\d+(\.\d+)?$/, 'Value must be a positive number')
      .required('This field is required'),
    preventDisplayName: yup.boolean().default(false),
    currency: yup.string().required('This field is required'),
  })
  .required();

export const useDonateProject = (onDonate: (data: DonateReq) => void) => {
  // const { isConnected, Web3Connect } = Dapp.useWeb3();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const isIdentityUser = currentIdentity?.type === 'users';

  const { ConnectButton, connected, wallet, address } = Connect();

  const {
    register,
    setValue,
    watch,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<DonateReq>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const selectedCurrency = watch('currency');
  const selectedCurrencyLabel = CURRENCIES.find(currency => currency.value === selectedCurrency)?.label;
  const donateValue = watch('donate') || 0;
  //FIXME: convert selected currency to $
  const donateValueConversion = donateValue;

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

  const onSelectCurrency = (value: string) => setValue('currency', value, { shouldValidate: true });

  const onPreventDisplayName = (checked: boolean) => setValue('preventDisplayName', checked);

  const onSubmit = async (data: DonateReq) => {
    if (!connected ||!wallet) return;

    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(
        config.payoutDonationsAddress,
        `${BigInt(data.donate) * 1000000n}`
      );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    data.transactionHash = txHash;
    data.wallet_address = address;
    return onDonate(data);
  }

  return {
    data: {
      isIdentityUser,
      register,
      errors,
      selectedCurrency,
      selectedCurrencyLabel,
      donateValueConversion,
      isConnected: connected,
      ConnectButton,
    },
    operations: {
      onSelectCurrency,
      onPreventDisplayName,
      handleSubmit,
      onSubmit,
    },
  };
};
