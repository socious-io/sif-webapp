import { FormColumnTemplateProps } from './index.types';

const FormColumnTemplate: React.FC<FormColumnTemplateProps> = ({
  title,
  subtitle,
  children,
  customStyle,
  isLarge = false,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row py-6  gap-5 md:gap-12 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0 ${customStyle}`}
    >
      <div className="w-full md:w-[280px] flex flex-col">
        <div className="text-[18px] font-medium leading-[28px] text-secondary-700">{title}</div>
        {subtitle && <div className="text-[16px] font-normal leading-[24px] text-tertiary-600">{subtitle}</div>}
      </div>
      <div className={`w-full ${isLarge ? 'md:w-[740px]' : 'md:w-[560px]'} flex`}>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default FormColumnTemplate;
