export const convertDateFormat = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes} UTC`;
};

export const getDaysUntil = (targetDate: string): number => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffMs = target.getTime() - today.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return days < 0 ? 0 : days; 
};
