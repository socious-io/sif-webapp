import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadMediaAdaptor } from 'src/core/adaptors';
import { Files } from 'src/modules/General/components/FileUploader/index.types';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useUploadBannerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cover_id } = useSelector((state: RootState) => state.createProject);
  const [attachments, setAttachments] = useState<Files[]>([]);

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      dispatch(setProjectData({ cover_id: data?.id, cover_url: data?.url }));
      if (error) return;
      data && setAttachments([{ id: data.id, url: data.url }]);
    });
  };
  const onDeleteFiles = (deletedId: string) => {
    const filteredFiles = attachments.filter(attachment => attachment.id !== deletedId);
    setAttachments(filteredFiles);
  };

  const navigateStep4 = () => navigate('/create/step-4');
  const goBack = () => navigate('/create/step-2');
  const isEnabled = cover_id === '';

  return { navigateStep4, attachments, goBack, onDropFiles, isEnabled, onDeleteFiles };
};
