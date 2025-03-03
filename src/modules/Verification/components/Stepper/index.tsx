import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';

import { StepperProps } from './index.types';

const Stepper: React.FC<StepperProps> = ({ iconName, title, subtitle, displayDivider }) => {
  return (
    <div className="w-full flex gap-3">
      <div className="w-fit flex flex-col items-start justify-start gap-1 pb-1">
        <FeaturedIcon iconName={iconName} type="modern" size="lg" theme="gray" />
        {displayDivider && (
          <div className="w-[50%] flex-grow border border-solid border-r-2 border-y-0 border-l-0 border-Gray-light-mode-200" />
        )}
      </div>
      <div className="flex flex-grow flex-col mb-6">
        <span className="font-semibold text-sm leading-5 text-Gray-light-mode-700">{title}</span>
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>
      </div>
    </div>
  );
};

export default Stepper;
