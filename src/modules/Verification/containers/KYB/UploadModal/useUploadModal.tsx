import { useState } from 'react';
import { useSelector } from 'react-redux';
import { uploadMediaWithProgressAdaptor, verifyOrganization } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';

import { FileState } from './index.types';

export const useUploadModal = (handleOpenSuccessModal: () => void) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const organizationId = currentIdentity?.id;
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const files = fileStates.map(fileState => ({ file: fileState.file, id: fileState.id }));
  const progressValues = fileStates.reduce((acc, { id, progress }) => {
    acc[id] = progress;
    return acc;
  }, {});
  const uploadedErrors = fileStates.reduce((acc, { id, error }) => {
    acc[id] = error;
    return acc;
  }, {});

  const updateFileState = (file: File, updates: Partial<Omit<FileState, 'file'>>) => {
    setFileStates(prev => prev.map(f => (f.file === file ? { ...f, ...updates } : f)));
  };

  const onDropFiles = async (newFiles: File[]) => {
    setError('');
    const newFileStates = newFiles.map((file, index) => ({
      id: `${fileStates.length + index}`,
      file,
      error: false,
      progress: 0,
    }));
    setFileStates(prev => [...prev, ...newFileStates]);

    const uploadPromises = newFiles.map(file =>
      uploadMediaWithProgressAdaptor(file, (progress: number) => {
        updateFileState(file, { progress });
      }),
    );
    const results = await Promise.all(uploadPromises);
    results.forEach((result, index) => {
      const file = newFiles[index];
      const { error, data } = result || {};
      const resultId = data?.id || '';
      if (error) {
        updateFileState(file, { error: true });
      } else if (resultId) {
        updateFileState(file, { id: resultId });
      }
    });
  };

  const onDeleteFiles = (fileId: string) => {
    setFileStates(prev => prev.filter(f => f.id !== fileId));
  };

  const handleContinue = async () => {
    if (!organizationId) return;
    setError('');
    setLoading(true);
    const fileIds = fileStates.map(file => file.id).filter(Boolean);
    const { error } = await verifyOrganization(organizationId, fileIds);
    if (error) setError(error);
    else handleOpenSuccessModal();
    setLoading(false);
  };

  return {
    data: {
      files,
      progressValues,
      uploadedErrors,
      error,
      loading,
    },
    operations: {
      onDropFiles,
      onDeleteFiles,
      handleContinue,
    },
  };
};
