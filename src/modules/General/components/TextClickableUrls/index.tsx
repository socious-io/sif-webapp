import styles from './index.module.scss';
import { TextClickableUrlsProps } from './index.types';

const TextClickableURLs: React.FC<TextClickableUrlsProps> = ({ text }) => {
  const detectURLs = (text: string) => {
    const includesProtocols = /^(?:(?:https?|fttps?):\/\/)/g;
    const urlRegex = /^(?:(?:https?|fttps?):\/\/)?(?:www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\/[\w-]+)*\/?$/g;
    const newLinesBreak = /[\n\r\s\t]+/g;
    const words = text.split(newLinesBreak);

    return words.map((word, index) => {
      if (urlRegex.test(word)) {
        return (
          <a
            key={index}
            href={includesProtocols.test(word) ? word : `https://${word}`}
            target="_blank"
            className={styles['link']}
            rel="noreferrer"
          >
            {' '}
            {word}
          </a>
        );
      } else {
        return ' ' + word;
      }
    });
  };
  return <>{detectURLs(text)}</>;
};

export default TextClickableURLs;
