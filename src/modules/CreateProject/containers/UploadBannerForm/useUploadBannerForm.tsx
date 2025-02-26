import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadMediaAdaptor } from 'src/core/adaptors';
import { Files } from 'src/modules/General/components/FileUploader/index.types';

export const useUploadBannerForm = () => {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<Files[] | null>([]);

  const onDropFiles = async (newFiles: File[]) => {
    console.log('new file', newFiles);
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      if (error) return;
      data && setAttachments([{ id: data.id, url: data.url }]);
    });
  };
  const navigateStep4 = () => navigate('/create/step-4');
  const goBack = () => navigate(-1);

  return { navigateStep4, attachments, goBack, onDropFiles };
};
