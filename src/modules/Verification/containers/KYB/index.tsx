import DescriptionModal from './DescriptionModal';
import { KYBProps } from './index.types';
import { SuccessModal } from './SuccessModal';
import UploadModal from './UploadModal';
import { useKYB } from './useKYB';

const KYB: React.FC<KYBProps> = ({ open, setOpen }) => {
  const {
    data: { openModals },
    operations: { handleClose, handleContinueFirstStep, handleOpenSuccessModal },
  } = useKYB(setOpen);

  if (!open) return;
  return (
    <>
      <DescriptionModal open={openModals.desc} handleClose={handleClose} handleContinue={handleContinueFirstStep} />
      <UploadModal open={openModals.upload} handleClose={handleClose} handleOpenSuccessModal={handleOpenSuccessModal} />
      <SuccessModal open={openModals.success} handleClose={handleClose} />
    </>
  );
};

export default KYB;
