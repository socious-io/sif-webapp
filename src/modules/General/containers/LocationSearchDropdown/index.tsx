import React from 'react';

import { CompanySearchDropdownProps } from './index.types';
import { useLocationSearchDropdown } from './useLocationSearchDropdown';
import SearchDropdown from '../../components/SearchDropdown';

const LocationSearchDropdown: React.FC<CompanySearchDropdownProps> = ({ onSelect, value }) => {
  const { searchCities } = useLocationSearchDropdown();
  return (
    <SearchDropdown
      id="location"
      value={value}
      placeholder="Select a location"
      isAsync
      creatable
      loadOptions={searchCities}
      icon="search-lg"
      hasDropdownIcon={false}
      onChange={value => onSelect(value)}
    />
  );
};
export default LocationSearchDropdown;
