import { CircularProgress, Divider } from '@mui/material';
import { DateRangeStatus } from 'src/core/helpers/date-converter';
import { translate } from 'src/core/helpers/utils';
import AlertMessage from 'src/modules/General/components/AlertMessage';
import AlertModal from 'src/modules/General/components/AlertModal';
import Button from 'src/modules/General/components/Button';
import CardRadioButton from 'src/modules/General/components/CardRadioButton';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import HorizontalTabs from 'src/modules/General/components/HorizontalTabs';
import Icon from 'src/modules/General/components/Icon';
import Link from 'src/modules/General/components/Link';
import SuccessModal from 'src/modules/Projects/components/SuccessModal';
import VoteInfo from 'src/modules/Projects/components/VoteInfo';
import variables from 'src/styles/constants/_exports.module.scss';

import { useVoteDonateCard } from './useVoteDonateCard';
import DonateProject from '../DonateProject';
import FiatDonation from '../FiatDonation';

const VoteDonateCard = () => {
  const {
    data: {
      detail,
      selectedCard,
      isVoteChoice,
      userImpactPoints,
      openSuccessModal,
      voteInfo,
      donateInfo,
      loading,
      alreadyVoted,
      openErrorModal,
      status,
    },
    operations: {
      setSelectedCard,
      onVoteOrDonate,
      setOpenSuccessModal,
      onContinue,
      setSelectedPayment,
      setOpenErrorModal,
      getAlertTitle,
    },
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
      title: translate('vote-donate.option-1-title'),
      description: translate('vote-donate.option-1-desc'),
      disabled: alreadyVoted || status !== DateRangeStatus.DURING,
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
      title:
        alreadyVoted || status !== DateRangeStatus.DURING
          ? translate('vote-donate.option-2-title-2')
          : translate('vote-donate.option-2-title'),
      description: translate('vote-donate.option-2-desc'),
    },
  ];

  const tabs = [
    {
      label: 'Crypto',
      content: <DonateProject onDonate={onVoteOrDonate} isLoading={loading} />,
    },
    {
      label: 'Fiat',
      content: <FiatDonation onDonate={onVoteOrDonate} />,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 md:p-6 bg-Base-White md:rounded-xl md:shadow-sm text-sm leading-5 text-Gray-light-mode-600">
        <div className="flex flex-col md:flex-row items-stretch md:items-start gap-5">
          <img
            src={detail.coverImg}
            alt="Project Cover"
            width={160}
            height={100}
            className="w-full md:w-[10rem] rounded-xl object-cover"
          />
          <div className="flex flex-col gap-1 text-sm leading-5 text-Gray-light-mode-600">
            <span className="text-xl font-medium leading-8 text-Gray-light-mode-900">
              <span className="font-normal">{translate('vote-donate.vote-for')}</span> {detail.title}
            </span>
            {translate('vote-donate.help-visibility-funding')}
          </div>
        </div>
        <Divider />
        <p>{translate('vote-donate.impact-cardano')}</p>
        <p>{translate('vote-donate.supported-wallet-lace')}</p>
        <div className="flex flex-col gap-2">
          <Link
            label={translate('vote-donate.why-cryptocurrency-link')}
            href="https://socious.org/#faq"
            target="_blank"
            customStyle="!font-semibold !underline cursor-pointer"
          />
          <Link
            label={translate('vote-donate.more-about-lace-link')}
            href="https://lace.io"
            target="_blank"
            customStyle="!font-semibold !underline cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
          {translate('vote-donate.to-vote')}
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
        {(alreadyVoted || status !== DateRangeStatus.DURING) && (
          <AlertMessage theme="warning" iconName="alert-circle" title={getAlertTitle()} />
        )}
        <Divider />
        {isVoteChoice ? (
          <>
            <VoteInfo impactPoints={userImpactPoints} />
            <Button type="button" color="primary" onClick={() => onVoteOrDonate()} disabled={loading}>
              {loading && <CircularProgress size="16px" sx={{ color: variables.color_white }} />}
              {translate('vote-donate.vote-now-btn')}
            </Button>
          </>
        ) : (
          <HorizontalTabs tabs={tabs} onChangeTab={tab => setSelectedPayment(tab.label as 'Fiat' | 'Crypto')} />
        )}
      </div>
      <AlertModal
        open={openErrorModal.open}
        onClose={() => setOpenErrorModal({ open: false, title: '', message: '' })}
        title={openErrorModal.title}
        message={openErrorModal.message}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButton={false}
      />
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
