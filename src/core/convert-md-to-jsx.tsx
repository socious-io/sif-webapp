import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

interface CustomLinkProps {
  children: ReactNode;
  href: string;
}
const CustomLink: React.FC<CustomLinkProps> = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

const options = {
  overrides: {
    a: {
      component: CustomLink,
    },
  },
};
export function convertMarkdownToJSX(value: string): JSX.Element {
  if (!value) return <></>;
  const modifiedVal = value.replaceAll('<br/>', '  \n');
  try {
    return <Markdown options={options}>{modifiedVal}</Markdown>;
  } catch (error) {
    console.error('Markdown rendering failed:', error);
    return <pre>{modifiedVal}</pre>;
  }
}

// turns 2025-03-28T00:00:00Z to  March 28, 2025
export const formatVotingStartMessage = (isoDate: Date, locale = 'en-US'): string => {
  const date = new Date(isoDate);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedDate = formatter.format(date);
  return formattedDate;
};
