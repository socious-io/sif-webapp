import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { SuccessModalProps } from './index.types';

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  handleClose,
  projectTitle,
  voteInfo,
  donateInfo,
  onContinue,
  ...props
}) => {
  const footerJsx = (
    <Button color="primary" variant="text" customStyle="!h-auto !py-0 !underline" onClick={onContinue}>
      {translate('vote-donate.success-modal.continue-btn')}
    </Button>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon theme="success" type="light-circle" size="xl" iconName="check-circle" />}
      title={`Thank you for your ${voteInfo ? 'vote' : 'donation'}!`}
      subTitle={
        <>
          {translate('vote-donate.success-modal.vote-or-contribution', { title: voteInfo ? 'vote' : 'contribution' })}
          <span className="font-medium text-Gray-light-mode-900"> {projectTitle} </span>
          {translate('vote-donate.success-modal.processed')}
        </>
      }
      footer={footerJsx}
      footerDivider={false}
      mobileCentered
      inlineTitle={false}
      centerHeader
      customStyle="md:max-w-[480px] pb-4 md:pb-6"
      contentClassName="p-4 md:p-6 leading-6 text-Gray-light-mode-600"
      {...props}
    >
      {voteInfo && (
        <p>
          {translate('vote-donate.success-modal.thanks-to-vote-project-support')}
          <p className="mt-4">{translate('vote-donate.success-modal.meaningful-change')}</p>
        </p>
      )}
      {donateInfo && (
        <>
          <p>
            Your donation of <span className="font-medium text-Gray-light-mode-900">800.00 ADA ($475.77 USD)</span> will
            be matched by an estimated $300.00 (this amount may change based on future voting results), resulting in a
            total contribution of $875.77 to support this project. Your generosity and commitment to this cause are
            greatly appreciated. Together, we are making a meaningful difference in the lives of those who need it most.
            Thank you for being a part of our community and helping us drive positive change.
            {/* {translate('vote-donate.success-modal.your-donation-of')} */}
            {/* <span className="font-medium text-Gray-light-mode-900">
              {` ${donateInfo.donate} ${donateInfo.currency} `}
            </span> */}
            {/* {donateInfo.donateConversion && `(${donateInfo.donateConversion}) `} */}
            {/* {translate('vote-donate.success-modal.meaningful-impact')} */}
          </p>
          {/* <p className="mt-4">{translate('vote-donate.success-modal.meaningful-difference')}</p> */}
        </>
      )}
      <p className="mt-4">{translate('vote-donate.success-modal.thank-you')}</p>
    </Modal>
  );
};

export default SuccessModal;
