import { useState, useCallback, useEffect } from 'react';
import { Point, Area } from 'react-easy-crop/types';

export const useEditImage = (
  file: File | null | undefined,
  aspectRatio: number,
  handleClose: () => void,
  onSave: (editedFile: File) => void,
) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageURL, setImageURL] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
      return () => URL.revokeObjectURL(url);
    }
    setImageURL('');
  }, [file]);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const saveImage = async () => {
    if (!file || !croppedAreaPixels) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2d context');

      const image = new Image();
      image.src = imageURL;

      await new Promise(resolve => {
        image.onload = resolve;
      });

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
      );

      const editedBlob = await new Promise<Blob>(resolve => {
        canvas.toBlob(blob => {
          if (blob) resolve(blob);
        }, file.type);
      });

      const editedFile = new File([editedBlob], file.name, {
        type: file.type,
        lastModified: Date.now(),
      });

      onSave(editedFile);
      handleClose();
    } catch (error) {
      setUploadError('Error processing image');
      console.error(error);
    }
  };

  return {
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    saveImage,
    imageURL,
    uploadError,
  };
};
