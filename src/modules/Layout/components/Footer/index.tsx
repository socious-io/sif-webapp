import { socialLinks } from './statics';
import { translate } from 'src/core/helpers/utils';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-[1280px] mx-4 md:mx-auto flex flex-col items-start md:flex-row md:items-center justify-between p-8 mt-16 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0">
      <p className="text-base text-Gray-light-mode-500 font-normal leading-6 order-2 md:order-1">
        {translate('footer-copyright')}
      </p>
      <div className="flex space-x-4 order-1 md:order-2 mb-4 md:mb-0">
        {socialLinks.map(({ alt, src, link }) => (
          <a key={alt} href={link} target="_blank" rel="noopener noreferrer">
            <img src={src} alt={alt} className="w-6 h-6" />
          </a>
        ))}
      </div>
    </footer>
  );
};
export default Footer;
