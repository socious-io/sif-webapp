import Select, { components, ControlProps, SingleValueProps } from 'react-select';
import Icon from 'src/modules/General/components/Icon';

import styles from './index.module.scss';
import { InputDropdownProps, OptionType } from './index.types';

const InputDropdown: React.FC<InputDropdownProps> = ({ options, icon, minWidth = '', ...props }) => {
  const CustomControl: React.FC<ControlProps<OptionType, false>> = ({ children, ...props }) => {
    //FIXME: ts errors
    return (
      <components.Control {...props}>
        {icon && <Icon className={styles['startIcon']} name={icon} fontSize={20} color="#667085" />}
        {children}
      </components.Control>
    );
  };

  const CustomOption = ({ value, ...props }) => {
    const { innerProps, label, data, ...rest } = props;
    const selected = value && value.label ? value.label === label : false;
    return (
      <div {...innerProps} className={`${styles['option']} ${selected ? `${styles['selecetdOption']}` : ''}`}>
        {selected && <Icon name="check" fontSize={20} color="#667085" />}
        <span>{data.icon}</span>
        {label}
      </div>
    );
  };
  const CustomSingleValue: React.FC<SingleValueProps<OptionType, false>> = ({ children, data, ...props }) => {
    return (
      <components.SingleValue data={data} {...props}>
        <div className="flex ">
          {children}
          {data.description && <div className={styles['description']}>{data.description}</div>}
        </div>
      </components.SingleValue>
    );
  };

  const selectedVal = props.value;

  return (
    <Select
      options={options}
      noOptionsMessage={() => null}
      className={styles['container']}
      components={{
        Option: props => <CustomOption {...props} value={selectedVal} />,
        Control: props => <CustomControl {...props} />,
        DropdownIndicator: () => (
          <div className={styles['dropdown']}>
            <Icon name="chevron-down" fontSize={20} color="#667085" />
          </div>
        ),
        SingleValue: CustomSingleValue,
      }}
      styles={{
        singleValue: (provided, state) => ({
          ...provided,
          color: '#101828',
          fontSize: '16px',
          width: 'auto',
          fontWeight: 500,
        }),

        control: (provided: any, state: any) => ({
          ...provided,
          padding: '0',
          '&:hover': '',
          minWidth,
          border: 'none',
          boxShadow: 'none',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
      }}
      {...props}
    />
  );
};

export default InputDropdown;
