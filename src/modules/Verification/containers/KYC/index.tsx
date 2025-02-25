import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';

import { KYCProps } from './index.types';

const KYC: React.FC<KYCProps> = ({ open, handleClose, connectUrl }) => {
  const footerJsx = (
    <div className="w-full block md:hidden p-6">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          const newTab = window.open(connectUrl, '_blank');
          newTab?.focus();
        }}
      >
        {translate('verification-kyc.open-wallet')}
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="modern" iconName="shield-tick" size="lg" theme="gray" />}
      title={translate('verification-kyc.title')}
      subTitle={translate('verification-kyc.subtitle')}
      footer={footerJsx}
      mobileFullHeight
      customStyle="!w-[512px]"
      contentClassName="h-full flex flex-col gap-5 px-4 py-5 md:p-6"
    >
      <>
        <div className="flex flex-col gap-1 p-4 rounded-xl border border-solid border-Gray-light-mode-300 bg-Gray-light-mode-25 text-sm font-normal leading-5 text-Gray-light-mode-600">
          <span className="font-semibold">{translate('verification-kyc.hint-title')}</span>
          {translate('verification-kyc.hint-subtitle')}
        </div>
        <span className="text-base font-semibold leading-6 text-Gray-light-mode-900">
          {translate('verification-kyc.how-verify')}
        </span>
        <div className="flex flex-col text-sm font-normal leading-5 text-Gray-light-mode-600">
          <span>{translate('verification-kyc.how-verify-step1')}</span>
          <span>{translate('verification-kyc.how-verify-step2')}</span>
        </div>
        <div className="hidden md:flex items-center justify-center p-4 rounded-default bg-Gray-light-mode-50">
          <QRCodeSVG value={connectUrl} size={200} />
        </div>
        <div className="flex flex-col md:items-center gap-4 text-sm leading-5 text-Gray-light-mode-600">
          {translate('verification-kyc.download-wallet')}
          <div className="flex items-center gap-4">
            <Link to="https://wallet.socious.io/ios" target="_blank">
              <img src="/images/app-store.svg" alt="App Store" width="100%" height="100%" className="cursor-pointer" />
            </Link>
            <Link to="https://wallet.socious.io/android" target="_blank">
              <img
                src="/images/google-play.svg"
                alt="Google Play"
                width="100%"
                height="100%"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </>
    </Modal>
  );
};

export default KYC;
