import React from 'react';

import { CompanySearchDropdownProps } from './index.types';
import { useLocationSearchDropdown } from './useLocationSearchDropdown';
import SearchDropdown from '../../components/SearchDropdown';

const LocationSearchDropdown: React.FC<CompanySearchDropdownProps> = ({ onSelect }) => {
  const { onSelectCity, searchCities, value } = useLocationSearchDropdown();
  return (
    <SearchDropdown
      isClearable
      id="location"
      value={value}
      placeholder="Select a location"
      isAsync
      creatable
      loadOptions={searchCities}
      icon="search-lg"
      hasDropdownIcon={false}
      onChange={value => console.log(value)}
    />
  );
};
export default LocationSearchDropdown;
