import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';
import Stepper from 'src/modules/Verification/components/Stepper';

import { DescriptionModalProps } from './index.types';

const DescriptionModal: React.FC<DescriptionModalProps> = ({ open, handleClose, handleContinue }) => {
  const steps = [
    {
      title: translate('verification-kyb.desc-step1-title'),
      subtitle: translate('verification-kyb.desc-step1-subtitle'),
      iconName: 'mail-01',
      displayDivider: true,
    },
    {
      title: translate('verification-kyb.desc-step2-title'),
      subtitle: translate('verification-kyb.desc-step2-subtitle'),
      iconName: 'hourglass-03',
      displayDivider: true,
    },
    {
      title: translate('verification-kyb.desc-step3-title'),
      subtitle: translate('verification-kyb.desc-step3-subtitle'),
      iconName: 'stars-02',
      displayDivider: false,
    },
  ];

  const footerJSX = (
    <div className="w-full flex flex-col gap-3 px-4 pb-4 pt-6 md:p-6">
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
        {translate('verification-kyb.continue-button')}
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
        {translate('verification-kyb.cancel-button')}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="check-verified-03" />}
      title={translate('verification-kyb.desc-title')}
      subTitle={translate('verification-kyb.desc-subtitle')}
      footer={footerJSX}
      inlineTitle={false}
      footerDivider={false}
      mobileFullHeight
      customStyle="md:!w-[480px]"
      contentClassName="h-full"
    >
      <div className="px-4 py-5 md:px-6">
        {steps.map(item => (
          <Stepper key={item.title} {...item} />
        ))}
      </div>
    </Modal>
  );
};

export default DescriptionModal;
