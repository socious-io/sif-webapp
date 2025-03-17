import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DonateReq, Project, voteOrDonateProjectAdaptor } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

export const useVoteDonateCard = () => {
  const navigate = useNavigate();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const [selectedCard, setSelectedCard] = useState('vote');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const isVoteChoice = selectedCard === 'vote';
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const isIdentityUser = currentIdentity?.type === 'users';

  const voteInfo = selectedCard === 'vote' ? { receivedAmount: '$23.50' } : undefined;
  const donateInfo =
    selectedCard === 'donate'
      ? {
          donate: '100.00',
          currency: 'ADA',
          donateConversion: '$46.77 USD',
          estimatedMatch: '$105.00',
          totalContribution: '$151.77',
        }
      : undefined;

  const onVoteOrDonate = async (donatePayload?: DonateReq) => {
    console.log('donate: ', donatePayload);
    const { error, data } = await voteOrDonateProjectAdaptor(detail.id, donatePayload);
    if (error) return;
    else if (data) {
      setOpenSuccessModal(true);
    }
  };

  const onContinue = () => navigate('/projects');

  return {
    data: {
      detail,
      selectedCard,
      isVoteChoice,
      isIdentityUser,
      openSuccessModal,
      voteInfo,
      donateInfo,
    },
    operations: {
      setSelectedCard,
      onVoteOrDonate,
      setOpenSuccessModal,
      onContinue,
    },
  };
};
