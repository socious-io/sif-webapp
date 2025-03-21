import { socialCausesToCategory } from 'src/core/adaptors';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import CardRadioButton from 'src/modules/General/components/CardRadioButton';
import MultiSelect from 'src/modules/General/components/MultiSelect';
import LocationSearchDropdown from 'src/modules/General/containers/LocationSearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import { useLocationCauseForm } from './useLocationCauseForm';

const LocationCauseForm: React.FC = () => {
  const {
    navigateStep2,
    items,
    options,
    selectedCardId,
    setSelectedCardId,
    goBack,
    onSelectCauses,
    onSelectLocation,
    isEnabled,
    social_cause,
    city,
    country,
  } = useLocationCauseForm();
  return (
    <div>
      <form>
        <div>
          <label className="text-[18px] font-medium leading-7 text-Gray-light-mode-700">
            {translate('location-label')}*
          </label>
        </div>
        <div className="text-[16px] font-normal leading-6 text-tertiary-600 mb-5">
          {translate('location-description')}
        </div>
        <CardRadioButton
          customStyle="flex flex-row w-full mt-5px] mb-[32px]"
          items={options}
          selectedValue={selectedCardId}
          setSelectedValue={value => {
            setSelectedCardId(value);
          }}
        />
        {selectedCardId === 'COUNTRY_CITY' && (
          <div className="my-5">
            <LocationSearchDropdown
              onSelect={location => onSelectLocation(location)}
              value={city ? { label: `${city}, ${country}`, city, country } : null}
            />
          </div>
        )}
        <div className="mb-12">
          <div>
            <label className="text-[18px] font-medium leading-7 text-Gray-light-mode-700">
              {translate('social-cause-label')}*
            </label>
          </div>
          <span className="text-[16px] font-normal leading-6 text-tertiary-600">
            {translate('social-cause-description')}
          </span>
          <div className="mt-5">
            <MultiSelect
              id={'social-causes'}
              max={1}
              items={items}
              placeholder={translate('social-cause-placeholder')}
              componentValue={social_cause ? socialCausesToCategory([social_cause]) : []}
              setComponentValue={onSelectCauses}
              customHeight="156px"
              chipBorderColor={variables.color_primary_200}
              chipBgColor={variables.color_primary_50}
              chipFontColor={variables.color_primary_700}
              chipIconColor={variables.color_primary_500}
            />
          </div>
        </div>
        <Button color="primary" block onClick={navigateStep2} customStyle="mt-8" disabled={!isEnabled}>
          {translate('continue-button')}
        </Button>
        <Button color="secondary" block variant="text" customStyle="mt-4" onClick={goBack}>
          {translate('back-button')}
        </Button>
      </form>
    </div>
  );
};

export default LocationCauseForm;
