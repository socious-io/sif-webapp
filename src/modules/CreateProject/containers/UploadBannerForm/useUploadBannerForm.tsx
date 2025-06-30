import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Files, uploadMediaAdaptor } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { setProjectData } from 'src/store/reducers/createProject.reducer';

export const useUploadBannerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cover_id, cover_url } = useSelector((state: RootState) => state.createProject);
  const [uneditedAttachments, setUneditedAttachments] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<Files[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);

  const onDropFiles = async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      const file = newFiles[0];
      setUneditedAttachments(file);
      setShowEditModal(true);
    }
  };
  // if user reloads the page fill preview data from redux persist
  useEffect(() => {
    if (cover_id !== '') {
      setAttachments([{ id: cover_id, url: cover_url }]);
    }
  }, []);

  const onDeleteFiles = (deletedId: string) => {
    const filteredFiles = attachments.filter(attachment => attachment.id !== deletedId);
    setAttachments(filteredFiles);
    dispatch(setProjectData({ cover_id: '', cover_url: '' }));
  };

  const handleEditComplete = async (editedFile: File) => {
    const { error, data } = await uploadMediaAdaptor(editedFile);
    if (!error && data) {
      dispatch(setProjectData({ cover_id: data.id, cover_url: data.url }));
      setAttachments([{ id: data.id, url: data.url, name: editedFile.name }]);
    }
    setUneditedAttachments(null);
    setShowEditModal(false);
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setUneditedAttachments(null);
  };

  const navigateStep4 = () => navigate('/create/step-7');
  const goBack = () => {
    if (attachments.length > 0) {
      const { id, url } = attachments[0];
      dispatch(setProjectData({ cover_id: id, cover_url: url }));
    } else {
      dispatch(setProjectData({ cover_id: '', cover_url: '' }));
    }
    navigate('/create/step-5');
  };
  const isEnabled = !cover_id;

  return {
    navigateStep4,
    attachments,
    goBack,
    onDropFiles,
    isEnabled,
    onDeleteFiles,
    showEditModal,
    handleModalClose,
    uneditedAttachments,
    handleEditComplete,
  };
};
