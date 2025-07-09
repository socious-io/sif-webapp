import { uploadMedia, uploadMediaWithProgress } from 'src/core/api';

import { AdaptorRes } from '..';
import { UploadMediaRes } from './index.types';

export const uploadMediaAdaptor = async (file: File): Promise<AdaptorRes<UploadMediaRes>> => {
  try {
    const res = await uploadMedia(file);
    return {
      data: {
        ...res,
        date: res.createdAt?.toString(),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in uploadMedia API Call: ', error);
    return {
      data: null,
      error: 'Error in uploadMedia API Call',
    };
  }
};

export const uploadMediaWithProgressAdaptor = async (
  file: File,
  setProgress: (val: number) => void,
): Promise<AdaptorRes<UploadMediaRes>> => {
  try {
    const res = await uploadMediaWithProgress(file, setProgress);
    return {
      data: {
        ...res,
        date: res.createdAt?.toString(),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in uploadMedia API Call: ', error);
    return {
      data: null,
      error: 'Error in uploadMedia API Call',
    };
  }
};
