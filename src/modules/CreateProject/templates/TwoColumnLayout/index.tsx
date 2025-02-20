import { ReactNode } from 'react';
import logo from 'src/assets/images/logo/logo.svg';

interface TwoColumnLayoutProps {
  title: string;
  description: string | ReactNode;
  bulletPoints?: string[];
  descriptionMode?: 'text' | 'html';
  children: ReactNode;
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  title,
  description,
  bulletPoints,
  descriptionMode = 'text',
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      <div className="hidden md:flex md:w-1/3 bg-[#F9FAFB] p-8 flex-col justify-center relative p-x-[64px]">
        <img className="w-[43px] absolute top-16 left-16 h-auto" src={logo} />

        <div className="mb-[12px]">
          <h1 className="text-[30px] font-medium leading-[38px] text-primary-900">{title}</h1>
        </div>

        {descriptionMode === 'text' ? (
          <>
            {description && (
              <p className="text-[16px] font-normal leading-[24px] text-tertiary-600 mb-3">{description}</p>
            )}
          </>
        ) : (
          <div className="text-[16px] font-normal leading-[24px] text-tertiary-600 mb-3">{description}</div>
        )}
      </div>

      <div className="w-full md:w-2/3 flex justify-center items-center p-8">
        <div className="w-full max-w-[560px]">
          <img className="w-[43px] mb-[24px] block md:hidden" src={logo} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;
