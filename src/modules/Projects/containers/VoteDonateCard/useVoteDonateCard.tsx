import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { DonateReq, Project, voteOrDonateProjectAdaptor } from 'src/core/adaptors';
import { CurrentIdentity, UserMeta } from 'src/core/api';
import { RootState } from 'src/store';

export const useVoteDonateCard = () => {
  const navigate = useNavigate();
  const { projectDetail: detail } = useLoaderData() as { projectDetail: Project };
  const [selectedCard, setSelectedCard] = useState('vote');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [currentDonateInfo, setCurrentDonateInfo] = useState<DonateReq | null>(null);
  const [loading, setLoading] = useState(false);
  const isVoteChoice = selectedCard === 'vote';
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(i => i.current);
  });
  const isIdentityUser = currentIdentity?.type === 'users';
  const userImpactPoints = isIdentityUser ? (currentIdentity.meta as UserMeta).impact_points : undefined;
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
    if (selectedCard === 'donate' && donatePayload) setCurrentDonateInfo(donatePayload);

    setLoading(true);
    const { error, data } = await voteOrDonateProjectAdaptor(detail.id, donatePayload);
    if (error) {
      setLoading(false);
      return;
    }
    if (data) setOpenSuccessModal(true);
    setLoading(false);
  };

  const onContinue = () => navigate('/projects');

  return {
    data: { detail, selectedCard, isVoteChoice, userImpactPoints, openSuccessModal, voteInfo, donateInfo, loading },
    operations: { setSelectedCard, onVoteOrDonate, setOpenSuccessModal, onContinue },
  };
};
