import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import {
  confirmDonationAdaptor,
  ConfirmDonationRes,
  CurrentIdentity,
  DonateReq,
  Project,
  voteOrDonateProjectAdaptor,
} from 'src/core/adaptors';
import useConfirm3DS from 'src/core/hooks/useConfirm3DS';
import { RootState } from 'src/store';

export const useVoteDonateCard = () => {
  const navigate = useNavigate();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const [selectedCard, setSelectedCard] = useState(detail.voted ? 'donate' : 'vote');
  const [open3DSModal, setOpen3DSModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [currentConfirmDonationData, setCurrentConfirmDonationData] = useState<ConfirmDonationRes | null>(null);
  const [currentDonateInfo, setCurrentDonateInfo] = useState<DonateReq | null>(null);
  const [loading, setLoading] = useState(false);
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'Fiat' | 'Crypto'>('Fiat');
  const [errorMessage, setErrorMessage] = useState('');
  const isVoteChoice = selectedCard === 'vote';
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const userImpactPoints = currentIdentity?.impact_points;
  const voteInfo = selectedCard === 'vote' ? { receivedAmount: '' } : undefined;
  const donateInfo =
    selectedCard === 'donate'
      ? {
          donate: Number(currentDonateInfo?.donate || 0).toFixed(2),
          currency:
            selectedPayment === 'Crypto'
              ? CURRENCIES.find(currency => currency.value === currentDonateInfo?.currency)?.label ||
                CURRENCIES[0].label
              : 'USD',
          donateConversion:
            selectedPayment === 'Crypto' ? `$${Number(currentDonateInfo?.donate || 0).toFixed(2)} USD` : '',
        }
      : undefined;

  // 3DS Hook
  useConfirm3DS(
    open3DSModal,
    () => setOpen3DSModal(false),
    currentConfirmDonationData?.clientSecret || '',
    async paymentIntentId => {
      const { donationId = '' } = currentConfirmDonationData || {};
      const { error, data } = await confirmDonationAdaptor(donationId, paymentIntentId);
      if (!error && data) setOpenSuccessModal(true);
    },
    message => setErrorMessage(message),
  );

  const onVoteOrDonate = async (donatePayload?: DonateReq) => {
    // if (currentIdentity?.verified) {
    if (selectedCard === 'donate' && donatePayload) setCurrentDonateInfo(donatePayload);

    setLoading(true);
    const { error, data } = await voteOrDonateProjectAdaptor(detail.id, donatePayload);
    if (error) {
      setLoading(false);
      return;
    }
    if (data) {
      const confirmDonationData = data as ConfirmDonationRes;
      if (confirmDonationData.is3DSRequired) {
        setOpen3DSModal(true);
        setCurrentConfirmDonationData(confirmDonationData);
      } else {
        setOpenSuccessModal(true);
      }
    }
    setLoading(false);
    // } else {
    //   setShowConfirmationModal(true);
    // }
  };

  const navigateToVerify = () => {
    window.open(config.accountCenterURL + '/verification', '_blank');
  };

  const onContinue = () => navigate('/projects');

  return {
    data: {
      detail,
      selectedCard,
      isVoteChoice,
      userImpactPoints,
      openSuccessModal,
      voteInfo,
      donateInfo,
      loading,
      // showConfirmationModal,
      selectedPayment,
      alreadyVoted: detail.voted,
      errorMessage,
    },
    operations: {
      setSelectedCard,
      onVoteOrDonate,
      setOpenSuccessModal,
      onContinue,
      // setShowConfirmationModal,
      navigateToVerify,
      setSelectedPayment,
      setErrorMessage,
    },
  };
};
