import { Media } from './index.types';
import { post, get } from '../http';

export async function getMedia(id: string): Promise<Media> {
  return (await get<Media>(`/media/${id}`)).data;
}

export async function uploadMedia(file: File): Promise<Media> {
  const formData = new FormData();
  formData.append('file', file);
  return (await post<Media>('/media', formData)).data;
}

export async function uploadMediaWithProgress(file: File, setProgress: (val: number) => void): Promise<Media> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await post<Media>('/media', formData, {
    onUploadProgress: progressEvent => {
      if (progressEvent?.total) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentage);
      }
    },
  });
  return res.data;
}
