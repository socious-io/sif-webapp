import { CircularProgress, Divider } from '@mui/material';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { translate } from 'src/core/helpers/utils';
// import AlertModal from 'src/modules/General/components/AlertModal';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import Input from 'src/modules/General/components/Input';
import VoteInfo from 'src/modules/Projects/components/VoteInfo';
import variables from 'src/styles/constants/_exports.module.scss';

import { DonateProjectProps } from './index.types';
import { useDonateProject } from './useDonateProject';

const DonateProject: React.FC<DonateProjectProps> = ({ isLoading, onDonate }) => {
  const {
    data: {
      userImpactPoints,
      register,
      errors,
      totalPay,
      selectedCurrency,
      selectedCurrencyLabel,
      donateValueConversion,
      isConnected,
      ConnectButton,
      // showConfirmationModal,
    },
    operations: {
      onSelectCurrency,
      onPreventDisplayName,
      handleSubmit,
      onSubmit,
      // setShowConfirmationModal,
      navigateToVerify,
    },
  } = useDonateProject(onDonate);

  return (
    <form className="flex flex-col items-stretch gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-lg font-medium leading-7 text-Gray-light-mode-900">
          {translate('vote-donate.power-funding-title')}
        </span>
        {translate('vote-donate.power-funding-subtitle')}
      </div>
      <Input
        register={register}
        id="donate"
        name="donate"
        label={translate('vote-donate.enter-donation')}
        placeholder="0"
        postfixDropdown={{
          options: CURRENCIES.filter(currency => currency.fiatOrCrypto === 'crypto'),
          value: selectedCurrency,
          onChange: onSelectCurrency,
        }}
        noBorderPostfix
        hints={[{ hint: `~ $ ${donateValueConversion}`, hide: !!errors.donate }]}
        hintCustomClass="!text-right"
        errors={errors.donate?.message ? [errors.donate.message.toString()] : undefined}
      />
      <VoteInfo impactPoints={userImpactPoints} />
      <Divider />
      <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
        {translate('vote-donate.payment-method')}
        <ConnectButton />
        <Checkbox
          id="preventDisplayName"
          name="preventDisplayName"
          label={translate('vote-donate.prevent-display-name')}
          onChange={(_, checked) => onPreventDisplayName(checked)}
        />
      </div>
      {/* <Divider />
      <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
        {translate('vote-donate.donation-section')}
        <div className="flex flex-col items-stretch gap-2">
          <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
            {translate('vote-donate.your-donate')}
            <span className="text-base font-medium leading-6 text-Gray-light-mode-600">
              {donateValue} {selectedCurrencyLabel}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
            {translate('vote-donate.socious-fee')} ({sociousFee}%)
            <span className="text-base font-medium leading-6 text-Gray-light-mode-600">
              {donateWithFee.toFixed(2)} {selectedCurrencyLabel}
            </span>
          </div>
        </div>
      </div> */}
      <Divider />
      <div className="flex items-center justify-between text-sm font-medium leading-5 text-Gray-light-mode-700">
        {translate('vote-donate.total-pay')}
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">
          {totalPay} {selectedCurrencyLabel}
        </span>
      </div>
      <Button type="submit" color="primary" disabled={!isConnected || isLoading}>
        {isLoading && <CircularProgress size="16px" sx={{ color: variables.color_white }} />}
        {translate('vote-donate.donate-now-btn')}
      </Button>
      {/* <AlertModal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onSubmit={navigateToVerify}
        message={translate('alertModal.message')}
        title={translate('alertModal.title')}
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel={translate('alertModal.verify-button-label')}
        closeButtonLabel={translate('alertModal.close-button-label')}
      /> */}
    </form>
  );
};

export default DonateProject;
