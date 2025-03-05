import Button from 'src/modules/General/components/Button';
import CardRadioButton from 'src/modules/General/components/CardRadioButton';
import MultiSelect from 'src/modules/General/components/MultiSelect';
import LocationSearchDropdown from 'src/modules/General/containers/LocationSearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import { useLocationCauseForm } from './useLocationCauseForm';
import { socialCausesToCategory } from 'src/core/adaptors';

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
    socialCause,
  } = useLocationCauseForm();
  return (
    <div>
      <form>
        <div>
          <label className="text-[18px] font-medium leading-[28px] text-secondary-900">Location*</label>
        </div>
        <span className="text-[16px] font-normal leading-[24px] text-tertiary-600">
          Choose the location of your project
        </span>
        <CardRadioButton
          customStyle="flex flex-row w-full mt-[20px] mb-[32px]"
          items={options}
          selectedValue={selectedCardId}
          setSelectedValue={value => {
            setSelectedCardId(value);
          }}
        />
        {selectedCardId === 'City / Country' && (
          <div className="my-[20px]">
            <LocationSearchDropdown
              onSelect={location => onSelectLocation(location)}
              value={{ label: 'rasht', city: 'rasht', country: '' }}
            />
          </div>
        )}
        <div className="mb-[48px]">
          <div>
            <label className="text-[18px] font-medium leading-[28px] text-secondary-900">Social cause*</label>
          </div>
          <span className="text-[16px] font-normal leading-[24px] text-tertiary-600">
            What best describes why you're fundraising?
          </span>
          <div className="mt-5">
            <MultiSelect
              id={'social-causes'}
              max={1}
              items={items}
              placeholder={'Search a social cause'}
              componentValue={socialCause ? socialCausesToCategory([socialCause]) : []}
              setComponentValue={onSelectCauses}
              customHeight="156px"
              chipBorderColor={variables.color_primary_200}
              chipBgColor={variables.color_primary_50}
              chipFontColor={variables.color_primary_700}
              chipIconColor={variables.color_primary_500}
            />
          </div>
        </div>
        <Button color="primary" block onClick={navigateStep2} customStyle="mt-32px" disabled={!isEnabled}>
          Continue
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-[16px]" onClick={goBack}>
          Back
        </Button>
      </form>
    </div>
  );
};

export default LocationCauseForm;
