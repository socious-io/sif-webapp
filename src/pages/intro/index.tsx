import { Typography } from '@mui/material';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import CardRadioButton from 'src/modules/General/components/CardRadioButton';
import Icon from 'src/modules/General/components/Icon';
import { LanguageSwitcher } from 'src/modules/General/components/LanguageSwitcher';
import Link from 'src/modules/General/components/Link';
import variables from 'src/styles/constants/_exports.module.scss';

import { useIntro } from './useIntro';

export const Intro = () => {
  const {
    data: { selectedCard },
    operations: { setSelectedCard, onContinue },
  } = useIntro();

  const signupOptions = [
    {
      id: '1',
      value: 'user',
      icon: (
        <Icon
          name="user-01"
          fontSize={20}
          color={variables.color_grey_700}
          className="p-2 bg-Gray-light-mode-100 rounded-full"
        />
      ),
      title: translate('intro-individual'),
      description: translate('intro-individual-desc'),
    },
    {
      id: '2',
      value: 'org',
      icon: (
        <Icon
          name="building-05"
          fontSize={20}
          color={variables.color_grey_700}
          className="p-2 bg-Gray-light-mode-100 rounded-full"
        />
      ),
      title: translate('intro-organization'),
      description: translate('intro-organization-desc'),
    },
  ];

  return (
    <div className="h-[100vh] flex gap-6 p-6">
      <div className="relative flex-1 flex items-center justify-center">
        <div className="h-full max-w-[22.5rem]ّ flex flex-col justify-between md:justify-center">
          <div className="flex flex-col items-center justify-center gap-6">
            <img src="logo.svg" alt="SIF Logo" width={60} height={60} />
            <div className="flex flex-col items-center gap-3 mb-2 leading-6 text-Gray-light-mode-600 text-center">
              <span className="text-2xl md:text-3xl font-semibold leading-8 md:leading-9 text-Gray-light-mode-900">
                {translate('intro-create-account-header')}
              </span>
              {translate('intro-create-account-subheader')}
            </div>
            {/* <CardRadioButton
              items={signupOptions}
              selectedValue={selectedCard}
              setSelectedValue={setSelectedCard}
              titleClassName="!text-Brand-800"
            /> */}
            <Button color="primary" fullWidth onClick={onContinue}>
              {translate('intro-login-with-socious')}
            </Button>
            {/* <div className="mt-2">
              <Typography variant="caption" className="text-Gray-light-mode-600">
                {translate('intro-already-account')}
              </Typography>
              <Link href="/test" label={translate('intro-login')} customStyle="!font-semibold" />
            </div> */}
          </div>
          <div className="md:absolute md:top-0 md:left-0 md:transform-none flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
      <div className="flex-1 hidden md:block overflow-hidden rounded-2xl">
        <img src="/images/intro.svg" alt="SIF Intro" width="100%" height="100%" className="object-cover" />
      </div>
    </div>
  );
};
