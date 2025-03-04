export type Location = {
  city: string;
  countryCode: string;
  label: string;
};
export interface CompanySearchDropdownProps {
  onSelect: (value) => void;
  value?: Location;
}
