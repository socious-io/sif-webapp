import { translate } from 'src/core/helpers/utils';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { SuccessModalProps } from './index.types';

export const SuccessModal: React.FC<SuccessModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="success" size="lg" iconName="check-circle" />}
      title={translate('verification-kyb.success-title')}
      subTitle={translate('verification-kyb.success-subtitle')}
      inlineTitle={false}
      headerDivider={false}
      mobileCentered
      customStyle="md:!w-[480px]"
    />
  );
};
