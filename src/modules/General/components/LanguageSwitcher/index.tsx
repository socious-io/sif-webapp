import { LANGUAGES } from 'src/constants/Languages';
import { OptionType } from 'src/core/adaptors';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';

import SearchDropdown from '../SearchDropdown';

export const LanguageSwitcher = () => {
  const { selectedLanguage, switchLanguage } = useSwitchLanguage();
  return (
    <div className="w-[200px]">
      <SearchDropdown
        border={false}
        id="size"
        className="mb-5"
        placeholder="English (US)"
        options={LANGUAGES}
        isSearchable={false}
        value={LANGUAGES.find(option => option.value === selectedLanguage)}
        onChange={newValue => {
          const option = newValue as OptionType;
          if (option) {
            switchLanguage(option.value);
          }
        }}
      />
    </div>
  );
};
