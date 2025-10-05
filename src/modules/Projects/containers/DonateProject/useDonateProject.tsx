import { yupResolver } from '@hookform/resolvers/yup';
import { MeshTxBuilder, Transaction } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/provider';
import { Web3Sdk } from '@meshsdk/web3-sdk';
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

const provider = new BlockfrostProvider(config.blockfrostProjectId);
const sdk = new Web3Sdk({
  projectId: config.meshProjectId,
  apiKey: config.meshApiKey,
  network: config.env === 'production' ? 'mainnet' : 'testnet',
  privateKey: config.meshPrivateKey,
  fetcher: provider,
  submitter: provider,
});

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

    /* Build transaction */

    // const tx = new Transaction({ initiator: wallet });
    const txBuilder = new MeshTxBuilder({
      fetcher: provider,
    });

    // if (selectedCurrency.value === 'lovelace') {
    //   tx.sendLovelace(config.payoutDonationsAddress, `${BigInt(data.donate) * selectedCurrency.decimals}`);
    // } else {
    //   tx.sendAssets(config.payoutDonationsAddress, [
    //     {
    //       unit: selectedCurrency.value,
    //       quantity: `${BigInt(data.donate) * selectedCurrency.decimals}`,
    //     },
    //   ]);
    // }
    txBuilder.txOut(config.payoutDonationsAddress, [
      { unit: selectedCurrency.value, quantity: `${BigInt(data.donate) * selectedCurrency.decimals}` },
    ]);

    /* Setup sponsorship in transaction */
    const staticInfo = sdk.sponsorship.getStaticInfo();

    txBuilder.changeAddress(staticInfo.changeAddress);

    txBuilder.txIn(
      staticInfo.utxo.input.txHash,
      staticInfo.utxo.input.outputIndex,
      staticInfo.utxo.output.amount,
      staticInfo.utxo.output.address,
      0,
    );

    try {
      /* Build transaction */
      // const unsignedTx = await tx.build();
      const unsignedTx = await txBuilder.complete();

      /* Do sponsorship */
      const sponsoredTx = await sdk.sponsorship.sponsorTx({
        sponsorshipId: config.meshSponsorshipId,
        tx: unsignedTx,
      });

      if (sponsoredTx.success) {
        // const signedTx = await wallet.signTx(unsignedTx);
        const signedTx = await wallet.signTx(sponsoredTx.data);
        const txHash = await wallet.submitTx(signedTx);
        const rate = await selectedCurrency.rateConversionFunc(data.donate);
        return onDonate({ ...data, transactionHash: txHash, wallet_address: address, rate, anonymous });
      }
    } catch (error) {
      alert(error);
    }
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
