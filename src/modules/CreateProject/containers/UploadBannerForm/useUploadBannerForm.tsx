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
  const [attachments, setAttachments] = useState<Files[] | null>([]);
  const { cover_id } = useSelector((state: RootState) => state.createProject);

  const onDropFiles = async (newFiles: File[]) => {
    console.log('new file', newFiles);
    newFiles.forEach(async (file: File) => {
      const { error, data } = await uploadMediaAdaptor(file);
      dispatch(setProjectData({ cover_id: data?.url }));
      if (error) return;
      data && setAttachments([{ id: data.id, url: data.url }]);
    });
  };
  const navigateStep4 = () => navigate('/create/step-4');
  const goBack = () => navigate(-1);
  const isEnabled = cover_id !== '';

  return { navigateStep4, attachments, goBack, onDropFiles, isEnabled };
};
