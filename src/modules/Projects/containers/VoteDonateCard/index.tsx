import { Divider } from '@mui/material';
import Button from 'src/modules/General/components/Button';
import CardRadioButton from 'src/modules/General/components/CardRadioButton';
import Icon from 'src/modules/General/components/Icon';
import Link from 'src/modules/General/components/Link';
import SuccessModal from 'src/modules/Projects/components/SuccessModal';
import VoteInfo from 'src/modules/Projects/components/VoteInfo';
import variables from 'src/styles/constants/_exports.module.scss';

import { useVoteDonateCard } from './useVoteDonateCard';
import DonateProject from '../DonateProject';

const VoteDonateCard = () => {
  const {
    data: { detail, selectedCard, isVoteChoice, isIdentityUser, openSuccessModal, voteInfo, donateInfo },
    operations: { setSelectedCard, onVoteOrDonate, setOpenSuccessModal, onContinue },
  } = useVoteDonateCard();

  const voteChoices = [
    {
      id: '1',
      value: 'vote',
      icon: (
        <Icon
          name="heart-hand"
          fontSize={20}
          color={variables.color_primary_600}
          className="p-[0.625rem] bg-Brand-100 rounded-full"
        />
      ),
      title: 'Vote without donation',
      description: 'Support the project with your vote.',
    },
    {
      id: '2',
      value: 'donate',
      icon: (
        <Icon
          name="coins-hand"
          fontSize={20}
          color={variables.color_primary_600}
          className="p-[0.625rem] bg-Brand-100 rounded-full"
        />
      ),
      title: 'Vote with a donation',
      description: 'Amplify your impact by making a donation in addition to your vote.',
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 md:p-6 bg-Base-White md:rounded-xl md:shadow-sm text-sm leading-5 text-Gray-light-mode-600">
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-5">
          <img
            src="/images/explorer-cover.png"
            alt="Project Cover"
            width={160}
            height={100}
            className="w-full md:w-[10rem] rounded-xl object-cover"
          />
          <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
            <span className="text-xl font-medium leading-8 text-Gray-light-mode-900">
              <span className="font-normal">Vote for</span> {detail.title}
            </span>
            Your vote will help this project gain visibility and increases its chances of receiving funding from our
            community-driven platform.
          </div>
        </div>
        <Divider />
        <p>
          While voting is free, you have the option to make a donation to amplify your impact. Donations are securely
          processed using ADA cryptocurrency on the Cardano network to ensure transparency, accountability and a fair
          allocation of matching funds.
        </p>
        <p>
          Currently, we only support Lace Wallet for connection. Lace is a user-friendly wallet developed by Input
          Output Global, available as a browser extension.
        </p>
        <div className="flex flex-col gap-2">
          <Link label="Why using cryptocurrency?" customStyle="!font-semibold !underline cursor-pointer" />
          <Link label="More about Lace Wallet" customStyle="!font-semibold !underline cursor-pointer" />
        </div>
        <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
          To vote:
          <CardRadioButton
            items={voteChoices}
            selectedValue={selectedCard}
            setSelectedValue={setSelectedCard}
            direction="col"
            customStyle="flex md:flex-row"
            containerClassName="min-h-[10.5rem] md:min-h-auto"
            titleClassName="!text-lg !font-semibold !leading-7 !text-Gray-light-mode-900"
          />
        </div>
        <Divider />
        {isVoteChoice ? (
          <>
            {/* @FIXME: <VoteInfo estimatedMatch="$23.50" impactPoints={isIdentityUser ? 272 : undefined} />} */}
            <Button type="button" color="primary" onClick={() => onVoteOrDonate()}>
              Vote now
            </Button>
          </>
        ) : (
          <DonateProject onDonate={onVoteOrDonate} />
        )}
      </div>
      <SuccessModal
        open={openSuccessModal}
        handleClose={() => setOpenSuccessModal(false)}
        projectTitle={detail.title}
        voteInfo={voteInfo}
        donateInfo={donateInfo}
        onContinue={onContinue}
      />
    </>
  );
};

export default VoteDonateCard;
