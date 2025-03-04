import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { DonateReq } from 'src/core/adaptors';
import Dapp from 'src/core/dapp';
import * as yup from 'yup';

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
  const { isConnected, Web3Connect } = Dapp.useWeb3();
  //FIXME: not statics
  const isUser = false;
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

  const onSubmit = (data: DonateReq) => onDonate(data);

  return {
    data: {
      isUser,
      register,
      errors,
      selectedCurrency,
      selectedCurrencyLabel,
      donateValueConversion,
      isConnected,
      Web3Connect,
    },
    operations: {
      onSelectCurrency,
      onPreventDisplayName,
      handleSubmit,
      onSubmit,
    },
  };
};
