import { Props } from 'react-select';

export interface SelectProps extends Props {
  isAsync?: boolean;
  creatable?: boolean;
  label?: string;
  errors?: string[];
  icon?: string;
  hasDropdownIcon?: boolean;
  border?: boolean;
  loadOptions?: (inputValue: string, callback: (options: any) => void) => void;
  containerClassName?: string;
  controlClassName?: string;
  controlStyleObject?: React.CSSProperties;
  valueStyleObject?: React.CSSProperties;
}
