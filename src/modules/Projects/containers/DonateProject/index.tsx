import { Divider } from '@mui/material';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import Input from 'src/modules/General/components/Input';
import VoteInfo from 'src/modules/Projects/components/VoteInfo';

import { DonateProjectProps } from './index.types';
import { useDonateProject } from './useDonateProject';

const DonateProject: React.FC<DonateProjectProps> = ({ onDonate }) => {
  const {
    data: {
      isUser,
      register,
      errors,
      selectedCurrency,
      selectedCurrencyLabel,
      donateValueConversion,
      isConnected,
      Web3Connect,
    },
    operations: { onSelectCurrency, onPreventDisplayName, handleSubmit, onSubmit },
  } = useDonateProject(onDonate);

  return (
    <form className="flex flex-col items-stretch gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-lg font-medium leading-7 text-Gray-light-mode-900">Donate to amplify your impact</span>
        Making a donation enhances your voting power and helps this project secure additional funding through our
        matching pool.
      </div>
      <Input
        register={register}
        id="donate"
        name="donate"
        label="Enter your donation"
        placeholder="0"
        postfixDropdown={{
          options: CURRENCIES,
          value: CURRENCIES.find(currency => currency.value === selectedCurrency),
          onChange: onSelectCurrency,
        }}
        noBorderPostfix
        hints={[{ hint: `$ ${donateValueConversion}`, hide: !!errors.donate }]}
        hintCustomClass="!text-right"
        errors={errors.donate?.message ? [errors.donate.message.toString()] : undefined}
      />
      <VoteInfo estimatedMatch="$10.00" impactPoints={isUser ? 272 : undefined} totalContribution="$10.00" />
      <Divider />
      <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
        Payment method
        <Web3Connect />
        <Checkbox
          id="preventDisplayName"
          name="preventDisplayName"
          label="Don’t display my name publicly on this project"
          onChange={(_, checked) => onPreventDisplayName(checked)}
        />
      </div>
      <Divider />
      <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
        Your donation
        <div className="flex flex-col items-stretch gap-2">
          <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
            Your donate
            <span className="text-base font-medium leading-6 text-Gray-light-mode-600">0 {selectedCurrencyLabel}</span>
          </div>
          <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
            Socious fees (2%)
            <span className="text-base font-medium leading-6 text-Gray-light-mode-600">0 {selectedCurrencyLabel}</span>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
        Total to pay
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">0 {selectedCurrencyLabel}</span>
      </div>
      <Button type="submit" color="primary" disabled={!isConnected}>
        Donate now
      </Button>
    </form>
  );
};

export default DonateProject;
