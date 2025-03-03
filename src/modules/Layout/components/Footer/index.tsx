import { socialLinks } from './statics';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between p-8 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0">
      <p className="text-base font-normal leading-6 order-2 md:order-1">© 2024 GIobal Inc. All rights reserved.</p>

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
