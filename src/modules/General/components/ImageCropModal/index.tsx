import React from 'react';
import Cropper from 'react-easy-crop';
import { translate } from 'src/core/helpers/utils';

import css from './editImage.module.scss';
import { useEditImage } from './useEditImage';
import Button from '../Button';
import Modal from '../Modal';

const EditImageModal: React.FC<{
  open: boolean;
  handleClose: () => void;
  file: File | null | undefined;
  aspectRatio: number;
  onSave: (editedFile: File) => void;
}> = ({ open, handleClose, file, aspectRatio, onSave }) => {
  const { crop, setCrop, zoom, setZoom, onCropComplete, saveImage, imageURL, uploadError } = useEditImage(
    file,
    aspectRatio,
    handleClose,
    onSave,
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col gap-3 px-4 py-4 md:px-6 md:py-6">
      {uploadError && <span className={css['edit-image__error-msg']}>{uploadError}</span>}
      <div className="w-full flex flex-col md:flex-row-reverse gap-3 md:justify-start">
        <Button customStyle="w-full md:w-fit" variant="contained" color="primary" onClick={saveImage}>
          {translate('general-image-editor.save')}
        </Button>
        <Button customStyle="w-full md:w-fit" variant="outlined" color="primary" onClick={handleClose}>
          {translate('general-image-editor.cancel')}
        </Button>
      </div>
    </div>
  );

  const cropperContentJsx = imageURL && (
    <div className={css['edit-image__crop-container']}>
      <div className={css['edit-image__crop-absolute']}>
        <Cropper
          image={imageURL}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={translate('general-image-editor.title')}
      subTitle={translate('general-image-editor.subtitle')}
      content={cropperContentJsx}
      footer={modalFooterJsx}
    />
  );
};

export default EditImageModal;
