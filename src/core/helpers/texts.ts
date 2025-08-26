export const beautifyText = (str: string) => {
  if (!str) return str;
  return (str.charAt(0).toUpperCase() + str.slice(1)).replaceAll('_', ' ');
};

export function convertSnakeCaseToLowerCase(value: string): string {
  try {
    return value.toLowerCase()?.replaceAll('_', ' ');
  } catch {
    console.warn('value could not be transform to lowercase');
    return '';
  }
}

export const truncateFromMiddle = (fullStr: string, frontChars: number, backChars: number, middleStr = '...') => {
  if (fullStr.length <= frontChars) return fullStr;
  return fullStr.slice(0, frontChars) + middleStr + fullStr.slice(fullStr.length - backChars);
};

export const countTextCharacters = (html: string): number => {
  const text = html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length;
};
