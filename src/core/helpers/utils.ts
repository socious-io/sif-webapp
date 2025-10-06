import { t } from 'i18next';

export const translate = t;

export const removeEmptyArrays = (obj: null | undefined | Record<string | number, unknown>) => {
  if (!obj) {
    return;
  }

  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (!Array.isArray(value) || !(value.length === 0)) Object.assign(prev, { [key]: value });

    return prev;
  }, {});
};

export const checkNullish = value => value !== null && value !== undefined;

export const getYouTubeEmbedUrl = (url: string | undefined): string | undefined => {
  if (!url) return undefined;
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : undefined;
};
