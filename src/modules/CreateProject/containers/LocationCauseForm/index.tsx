import Button from "src/modules/General/components/Button";
import CardRadioButton from "src/modules/General/components/CardRadioButton";
import Input from "src/modules/General/components/Input";
import MultiSelect from "src/modules/General/components/MultiSelect";
import SearchDropdown from "src/modules/General/components/SearchDropdown";
import variables from "src/styles/constants/_exports.module.scss";
import { useLocationCauseForm } from "./useLocationCauseForm";
import { locationOptions } from "./statics";


const LocationCauseForm: React.FC = () => {
  const { navigateStep2 } = useLocationCauseForm();
  return (
    <div>
      <form>
        <div>
          <label className="text-[18px] font-medium leading-[28px] text-secondary-900">
            Location*
          </label>
        </div>
        <span className="text-[16px] font-normal leading-[24px] text-tertiary-600">
          Choose the location of your project
        </span>
        <CardRadioButton
          customStyle="flex flex-row w-full mt-[20px] mb-[32px]"
          items={locationOptions}
          selectedValue={null}
          setSelectedValue={(value) => {}}
        />
        <SearchDropdown
          id="location"
          placeholder={"Select a location"}
          isAsync
          // loadOptions={searchCities}
          className="my-5"
          icon="search-lg"
          hasDropdownIcon={false}
          // value={cityValue}
          // onChange={(value) => onSelectCity(value)}
        />
        <MultiSelect
          id={"social-causes"}
          searchTitle={"Social cause"}
          max={5}
          maxLabel={"What best describes why you're fundraising?"}
          items={[]}
          placeholder={"Search a social cause"}
          componentValue={[]}
          setComponentValue={() => console.log}
          customHeight="100px"
          chipBorderColor={variables.color_primary_200}
          chipBgColor={variables.color_primary_50}
          chipFontColor={variables.color_primary_700}
          chipIconColor={variables.color_primary_500}
        />
        <Button color="primary" block onClick={navigateStep2}>
          Continue
        </Button>
        <Button
          color="secondary"
          block
          variant="outlined"
          customStyle="mt-[16px]">
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default LocationCauseForm;
