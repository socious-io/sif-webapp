// radio-group.tsx
import { RadioGroup as RG } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import React, { useState } from 'react';

import css from './radio-group.module.scss';
import { RadioGroupProps } from './RadioGroup.types';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  row,
  items,
  selectedItem,
  id,
  name,
  label,
  errors,
  onChange,
  defaultValue,
  labelClassName = '',
  contentClassName = '',
}) => {
  const [selectedIndex, setSelectedIndex] = useState<null | number>();
  return (
    <FormControl>
      <FormLabel id={id} className={`${css.label} ${labelClassName} `}>
        {label}
      </FormLabel>
      <RG
        row={row}
        aria-labelledby={label}
        name={name}
        defaultValue={defaultValue}
        value={selectedItem ? selectedItem.value : items?.find((_, index) => index === selectedIndex)?.value}
      >
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {/* Use React.Fragment with a key for mapping */}
            <FormControlLabel
              value={item.value}
              control={
                <Radio
                  name={item.label}
                  disabled={!!item.disabled}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setSelectedIndex(index);
                    const value = event.target.value;
                    if (String(item.value) === value) onChange?.(item);
                  }}
                />
              }
              label={<span className={`${css.optionsText} ${contentClassName}`}>{item.label}</span>}
              sx={{ width: 'fit-content' }}
            />
            {(selectedIndex === index || item.value === defaultValue) && item.children}
          </React.Fragment>
        ))}
      </RG>
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}
    </FormControl>
  );
};
