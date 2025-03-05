import { useState } from 'react';
import { Location, searchLocation } from 'src/core/api';

export const useLocationSearchDropdown = () => {
  const cityToOption = (locations: Location[]) => {
    return locations.map(location => ({
      label: JSON.stringify({
        label: `${location.country_name}, ${location.name}`,
      }),
      country: location.country_name,
      city: location.name,
    }));
  };

  const searchCities = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cb(cityToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  return { searchCities };
};
