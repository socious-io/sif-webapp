export const convertDateFormat = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes} UTC`;
};

export const getDaysUntil = (targetDate: string | Date): number => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

export const isCurrentDateInRange = (startAt: string, endAt: string) => {
  const now = new Date();
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  return now >= startDate && now < endDate;
};

export enum DateRangeStatus {
  BEFORE = 'BEFORE',
  DURING = 'DURING',
  AFTER = 'AFTER',
}

export const getDateRangeStatus = (startDate: Date, endDate: Date): DateRangeStatus => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  if (end < today) {
    return DateRangeStatus.AFTER;
  } else if (start > today) {
    return DateRangeStatus.BEFORE;
  } else {
    return DateRangeStatus.DURING;
  }
};
