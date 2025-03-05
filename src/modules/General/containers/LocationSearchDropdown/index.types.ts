export type Location = {
  city: string;
  country: string;
  label: string;
};
export interface CompanySearchDropdownProps {
  onSelect: (value) => void;
  value?: Location;
}
