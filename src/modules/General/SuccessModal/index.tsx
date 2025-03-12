import React from 'react';
import { useTranslation } from 'react-i18next';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { SuccessModalProps } from './index.type';

const SuccessModal: React.FC<SuccessModalProps> = ({ open, handleClose, title, message }) => {
  const { t: translate } = useTranslation();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="success" size="lg" iconName="check-circle" />}
      title={title}
      subTitle={message}
      mobileFullHeight={false}
      mobileCentered={false}
      headerDivider={false}
      footerDivider={false}
      inlineTitle={false}
      customStyle="md:max-w-[480px]"
    />
  );
};

export default SuccessModal;
