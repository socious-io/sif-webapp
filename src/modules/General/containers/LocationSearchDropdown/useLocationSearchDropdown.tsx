import { useState } from 'react';
import { Location, searchLocation } from 'src/core/api';

export const useLocationSearchDropdown = () => {
  const cityToOption = (cities: Location[]) => {
    return cities.map(city => ({
      label: JSON.stringify({ label: `${city.name}, ${city.country_name}`, description: city.timezone_utc }),
      countryCode: city.country_code,
      city: city.name,
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
