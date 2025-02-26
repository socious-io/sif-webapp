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
    socialCauses,
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
            <LocationSearchDropdown onChange={location => onSelectLocation(location.City)} />
          </div>
        )}
        <div className="mb-[48px]">
          <MultiSelect
            id={'social-causes'}
            searchTitle={'Social cause'}
            max={5}
            maxLabel={"What best describes why you're fundraising?"}
            items={items}
            placeholder={'Search a social cause'}
            componentValue={socialCauses}
            setComponentValue={items => onSelectCauses(items)}
            customHeight="156px"
            chipBorderColor={variables.color_primary_200}
            chipBgColor={variables.color_primary_50}
            chipFontColor={variables.color_primary_700}
            chipIconColor={variables.color_primary_500}
          />
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
