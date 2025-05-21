import { useState } from 'react';
import { translate } from 'src/core/helpers/utils';
import Icon from 'src/modules/General/components/Icon';
import Input from 'src/modules/General/components/Input';
import variables from 'src/styles/constants/_exports.module.scss';

import { ReferCardProps } from './index.types';

const ReferCard: React.FC<ReferCardProps> = ({
  title,
  subtitle,
  copyLink,
  referrerReward,
  refereeReward,
  color = 'blue',
}) => {
  //Tailwind can't parse dynamic strings
  const lightBackgroundColor = {
    blue: 'bg-Wild_blue-100',
    green: 'bg-Dark_vanilla-100',
  }[color];
  const darkBackgroundColor = {
    blue: 'bg-Wild_blue-500',
    green: 'bg-Dark_vanilla-500',
  }[color];
  const darkBorderColor = {
    blue: 'border-Wild_blue-500',
    green: 'border-Dark_vanilla-500',
  }[color];
  const [copied, setCopied] = useState(false);

  const onCopyClick = () => {
    navigator.clipboard.writeText(copyLink);
    setCopied(true);
  };

  return (
    <>
      <div className={`flex-1 flex flex-col rounded-xl ${lightBackgroundColor}`}>
        <div className={`flex flex-col gap-1 py-6 px-4 md:px-6 border-0 border-b border-solid ${darkBorderColor}`}>
          <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{title}</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>
          <Input
            id="copy-url"
            value={copyLink}
            containerClassName="mt-5"
            disabled
            postfix={
              <div
                className={`flex items-center gap-1 font-semibold cursor-pointer ${copied && 'text-Success-700'}`}
                onClick={onCopyClick}
              >
                <Icon
                  name={copied ? 'tick' : 'copy-01'}
                  fontSize={20}
                  color={copied ? variables.color_success_700 : variables.color_grey_700}
                />
                {translate('general-copy-link')}
              </div>
            }
          />
        </div>
        <div className="flex flex-col gap-3 py-6 px-4 md:px-6">
          <div className="flex flex-col gap-3 text-lg font-semibold leading-7">
            {translate('refer-you-get')}
            <div className="flex items-start gap-3">
              <Icon
                name="tick"
                fontSize={10}
                color={variables.color_white}
                containerClass={`w-5 h-5 p-2 rounded-full ${darkBackgroundColor}`}
              />
              <p className="text-sm font-normal leading-5 text-Gray-light-mode-600">{referrerReward}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-lg font-semibold leading-7">
            {translate('refer-they-get')}
            <div className="flex items-start gap-3">
              <Icon
                name="tick"
                fontSize={10}
                color={variables.color_white}
                containerClass={`w-5 h-5 p-2 rounded-full ${darkBackgroundColor}`}
              />
              <p className="text-sm font-normal leading-5 text-Gray-light-mode-600">{refereeReward}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReferCard;
