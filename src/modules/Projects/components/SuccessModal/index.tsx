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
      Continue
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
          Your {voteInfo ? 'vote' : 'contribution'} to
          <span className="font-medium text-Gray-light-mode-900"> {projectTitle} </span>
          has been successfully processed.
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
          Thanks to your vote, the project is expected to receive
          <span className="font-medium text-Gray-light-mode-900"> {voteInfo.receivedAmount} </span>from the matching
          pool (this amount may change based on future votes). Your support to this cause is greatly appreciated.
          Together, we are making a meaningful difference in the world.
        </p>
      )}
      {donateInfo && (
        <>
          <p>
            Your donation of
            <span className="font-medium text-Gray-light-mode-900">
              {` ${donateInfo.donate} ${donateInfo.currency} `}
            </span>
            ({donateInfo.donateConversion}) will be matched by an estimated
            <span className="font-medium text-Gray-light-mode-900"> {donateInfo.estimatedMatch} </span>(this amount may
            change based on future voting results), resulting in a total contribution of
            <span className="font-medium text-Gray-light-mode-900"> {donateInfo.totalContribution} </span>to support
            this project.
          </p>
          <p className="mt-4">
            Your generosity and commitment to this cause are greatly appreciated. Together, we are making a meaningful
            difference in the lives of those who need it most.
          </p>
        </>
      )}
      <p className="mt-4">Thank you for being a part of our community and helping us drive positive change.</p>
    </Modal>
  );
};

export default SuccessModal;
