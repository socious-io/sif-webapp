import { TextField, InputAdornment, IconButton } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Icon from 'src/modules/General/components/Icon';
import InputDropdown from 'src/modules/General/components/InputDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './index.module.scss';
import { InputProps, Option } from './index.types';

const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  required,
  errors,
  isValid,
  validMessage,
  prefix,
  color,
  register,
  hints,
  startIcon,
  postfix,
  noBorderPostfix = false,
  noBorderPrefix = true,
  postfixDropdown,
  onEnter,
  containerClassName = '',
  hintCustomClass,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [endIcon, setEndIcon] = useState<React.ReactNode>('');
  const [inputType, setInputType] = useState(props.type || 'text');
  const [showEyeIcon, setShowEyeIcon] = useState(false);
  useEffect(() => {
    if (errors) setEndIcon(<Icon name="alert-circle" fontSize={14} color={variables.color_error_600} />);
    else if (props.type === 'password' && showPassword && showEyeIcon) {
      setInputType('text');
      setEndIcon(
        <IconButton disableRipple className={css.iconBtn} onClick={() => setShowPassword(false)}>
          <Icon name="eye-off" color={variables.color_grey_500} fontSize={24} />
        </IconButton>,
      );
    } else if (props.type === 'password' && !showPassword && showEyeIcon) {
      setInputType('password');
      setEndIcon(
        <IconButton disableRipple className={css.iconBtn} onClick={() => setShowPassword(true)}>
          <Icon name="eye" color={variables.color_grey_500} fontSize={24} />
        </IconButton>,
      );
    } else setEndIcon('');
  }, [errors, showPassword, showEyeIcon]);

  const setValue = (v: string) => {
    let val = v;
    if (props.type !== 'password') {
      val = val.trim();
    }
    if (props.type === 'password')
      if (val.length) setShowEyeIcon(true);
      else setShowEyeIcon(false);
    return val;
  };

  const handleKeydown = (e: ChangeEvent<unknown>) => {
    const value = (e.target as HTMLInputElement)?.value;
    if ('key' in e && e.key === 'Enter') {
      onEnter?.(value);
    }
  };

  const endAdornmentJSX = (
    <>
      {endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>}
      {postfix && (
        <InputAdornment position="start" className={noBorderPostfix ? css['postfix-no-border'] : css.postfix}>
          {postfix}
        </InputAdornment>
      )}
      {postfixDropdown && (
        <InputDropdown
          options={postfixDropdown.options}
          value={postfixDropdown.value}
          onChange={option => postfixDropdown.onChange?.((option as Option).value)}
          maxMenuHeight={100}
          minWidth={postfixDropdown.minWidth || '6rem'}
        />
      )}
    </>
  );
  return (
    <div className={containerClassName}>
      {label && (
        <div className={css.labelContainer}>
          <label htmlFor={id} className={css.label} aria-describedby={id}>
            {label}
          </label>
        </div>
      )}

      <TextField
        id={id}
        variant="outlined"
        className={`${css.default} ${errors ? css.errorColor : css.defaultColor}`}
        fullWidth
        onKeyDown={handleKeydown}
        InputProps={{
          style: {
            height: props.customHeight ? props.customHeight : '44px',
            backgroundColor: props.disabled && variables.color_grey_50,
          },
          endAdornment: endAdornmentJSX,

          startAdornment: prefix ? (
            <InputAdornment position="start" className={noBorderPrefix ? css['prefix-no-border'] : css.prefix}>
              {prefix}
            </InputAdornment>
          ) : startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : (
            ''
          ),
          spellCheck: 'false',
        }}
        {...(register
          ? register(name, {
              setValueAs: setValue,
            })
          : {})}
        {...props}
        type={inputType}
      />
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}
      {hints &&
        hints.map((hint, index) => (
          <p key={index} className={`${css.hintMsg} ${css.msg} ${hintCustomClass}`}>
            {!hint.hide && hint.hint}
          </p>
        ))}
      {isValid && validMessage && <p className={`${css.successMsg} ${css.msg}`}>{validMessage}</p>}
    </div>
  );
};

export default Input;
