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
      className={`flex py-6 gap-16 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0 ${customStyle}`}
    >
      <div className="flex flex-col w-[280px]">
        <div className="text-[18px] font-medium leading-[28px] text-secondary-700">{title}</div>
        {subtitle && <div className="text-[16px] font-normal leading-[24px] text-tertiary-600">{subtitle}</div>}
      </div>
      <div className={`flex ${isLarge ? 'w-[740px]' : 'w-[560px]'}`}>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default FormColumnTemplate;
