import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Modal from 'src/modules/General/components/Modal';
import ProgressFileUploader from 'src/modules/General/components/ProgressFileUploader';

import { UploadModalProps } from './index.types';
import { useUploadModal } from './useUploadModal';

const UploadModal: React.FC<UploadModalProps> = ({ open, handleClose, handleOpenSuccessModal }) => {
  const {
    data: { files, progressValues, uploadedErrors, error, loading },
    operations: { onDropFiles, onDeleteFiles, handleContinue },
  } = useUploadModal(handleOpenSuccessModal);

  const footerJSX = (
    <div className="w-full flex flex-col gap-3 px-4 pb-4 pt-6 md:p-6">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleContinue}
        disabled={!files.length || !!Object.values(uploadedErrors).some(Boolean)}
      >
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
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="upload-cloud-02" />}
      title={translate('verification-kyb.upload-title')}
      subTitle={translate('verification-kyb.upload-subtitle')}
      footer={footerJSX}
      inlineTitle={false}
      footerDivider={false}
      mobileFullHeight
      customStyle="md:!w-[480px]"
      contentClassName="h-full"
    >
      <div className="px-4 py-5 md:px-6">
        <ProgressFileUploader
          files={files}
          onDropFiles={onDropFiles}
          onDeleteFiles={onDeleteFiles}
          fileTypes={['PDF', 'PNG', 'JPG']}
          progressValues={progressValues}
          uploadedErrors={uploadedErrors}
          maxSize={2}
          maxFiles={10}
          error={error}
          loading={loading}
          customStyle="w-full h-[126px]"
        />
      </div>
    </Modal>
  );
};

export default UploadModal;
