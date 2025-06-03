import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { CurrentIdentity, DonateReq, Project, voteOrDonateProjectAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';

export const useVoteDonateCard = () => {
  const navigate = useNavigate();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const [selectedCard, setSelectedCard] = useState('vote');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [currentDonateInfo, setCurrentDonateInfo] = useState<DonateReq | null>(null);
  const [loading, setLoading] = useState(false);
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);
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
            CURRENCIES.find(currency => currency.value === currentDonateInfo?.currency)?.label || CURRENCIES[0].label,
          donateConversion: `$${Number(currentDonateInfo?.donate || 0).toFixed(2)} USD`,
        }
      : undefined;

  const onVoteOrDonate = async (donatePayload?: DonateReq) => {
    // if (currentIdentity?.verified) {
    if (selectedCard === 'donate' && donatePayload) setCurrentDonateInfo(donatePayload);

    setLoading(true);
    const { error, data } = await voteOrDonateProjectAdaptor(detail.id, donatePayload);
    if (error) {
      setLoading(false);
      return;
    }
    if (data) setOpenSuccessModal(true);
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
    },
    operations: {
      setSelectedCard,
      onVoteOrDonate,
      setOpenSuccessModal,
      onContinue,
      // setShowConfirmationModal,
      navigateToVerify,
    },
  };
};
