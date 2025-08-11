import { Divider } from '@mui/material';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Checkbox from 'src/modules/General/components/Checkbox';
import CreditCard from 'src/modules/General/components/CreditCard';
import Input from 'src/modules/General/components/Input';

import { useFiatDonation } from './useFiatDonation';
import AddCardModal from '../../components/AddCardModal';

const FiatDonation = ({ onDonate }) => {
  const {
    data: { openAddCardModal, card, disabled, donation, preventDisplayName, selectedCurrency },
    operations: {
      setOpenAddCardModal,
      onSelectCard,
      setDonation,
      onSubmit,
      setPreventDisplayName,
      setSelectedCurrency,
    },
  } = useFiatDonation(onDonate);
  return (
    <form className="flex flex-col items-stretch gap-5">
      <div className="flex flex-col gap-3 text-sm leading-5 text-Gray-light-mode-600">
        <span className="text-lg font-medium leading-7 text-Gray-light-mode-900">
          {translate('vote-donate.power-funding-title')}
        </span>
        {translate('vote-donate.power-funding-subtitle')}
      </div>
      <Input
        id="donate"
        name="donate"
        type="number"
        label={translate('vote-donate.enter-donation')}
        placeholder="0"
        noBorderPostfix
        hintCustomClass="!text-right"
        value={donation}
        postfixDropdown={{
          options: CURRENCIES.filter(currency => currency.fiatOrCrypto === 'fiat'),
          value: CURRENCIES.find(currency => currency.value === selectedCurrency),
          onChange: value => setSelectedCurrency(value),
        }}
        onChange={e => {
          const numericValue = e.target.value.replace(/[^0-9]/g, '');
          setDonation(numericValue);
        }}
      />
      <Divider />
      <div className="flex flex-col items-stretch gap-5 text-lg font-medium leading-7">
        {translate('vote-donate.payment-method')}
        {card && (
          <div className="flex items-center justify-center my-3">
            <div className="w-[80%]">
              <CreditCard {...card} />
            </div>
          </div>
        )}
        <Button color="secondary" variant="outlined" onClick={() => setOpenAddCardModal(true)}>
          {card ? translate('cont-change-card-btn') : translate('cont-add-card-btn')}
        </Button>
        <Checkbox
          id="preventDisplayName"
          name="preventDisplayName"
          label={translate('vote-donate.prevent-display-name')}
          checked={preventDisplayName}
          onChange={(_, checked) => setPreventDisplayName(checked)}
        />
      </div>
      <Divider />
      <Button onClick={onSubmit} color="primary" disabled={disabled}>
        {translate('vote-donate.donate-now-btn')}
      </Button>
      <AddCardModal
        open={openAddCardModal}
        handleClose={() => setOpenAddCardModal(false)}
        onSelectCard={onSelectCard}
      />
    </form>
  );
};

export default FiatDonation;
