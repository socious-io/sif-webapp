import { useState } from 'react';
import { uploadMediaWithProgressAdaptor } from 'src/core/adaptors';

import { FileState } from './index.types';

export const useUploadModal = (handleOpenSuccessModal: () => void) => {
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
      id: `${index}`,
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
    setError('');
    setLoading(true);
    const fileIds = fileStates.map(file => file.id).filter(Boolean);
    //FIXME: verify organization
    // const { error } = await verifyOrganization(orgId, fileIds);
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
