import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Files } from 'src/modules/General/components/FileUploader/index.types';

export const useUploadBannerForm = () => {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState<Files[] | null>(null);

  const navigateStep4 = () => navigate('/create/step-4');
  return { navigateStep4, attachments };
};
