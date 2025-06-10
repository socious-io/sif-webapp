import { TextField, InputAdornment, IconButton } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Icon from 'src/modules/General/components/Icon';
import InputDropdown from 'src/modules/General/components/InputDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
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
        <IconButton disableRipple className={styles['iconBtn']} onClick={() => setShowPassword(false)}>
          <Icon name="eye-off" color={variables.color_grey_500} fontSize={24} />
        </IconButton>,
      );
    } else if (props.type === 'password' && !showPassword && showEyeIcon) {
      setInputType('password');
      setEndIcon(
        <IconButton disableRipple className={styles['iconBtn']} onClick={() => setShowPassword(true)}>
          <Icon name="eye" color={variables.color_grey_500} fontSize={24} />
        </IconButton>,
      );
    } else setEndIcon('');
  }, [errors, showPassword, showEyeIcon]);

  const setValue = (v: string) => {
    let val = v;
    if (props.type !== 'password' && val) {
      val = val.toString().trim();
    }
    if (props.type === 'password' && val)
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
        <InputAdornment position="start" className={noBorderPostfix ? styles['postfix-no-border'] : styles['postfix']}>
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
        <div className={styles['labelContainer']}>
          <label htmlFor={id} className={styles['label']} aria-describedby={id}>
            {label}
          </label>
        </div>
      )}

      <TextField
        data-testid="currency"
        id={id}
        variant="outlined"
        className={`${styles['default']} ${errors ? styles['errorColor'] : styles['defaultColor']}`}
        fullWidth
        onKeyDown={handleKeydown}
        InputProps={{
          style: {
            height: props.customHeight ? props.customHeight : '44px',
            backgroundColor: props.disabled && variables.color_grey_50,
          },
          endAdornment: endAdornmentJSX,

          startAdornment: prefix ? (
            <InputAdornment position="start" className={noBorderPrefix ? styles['prefix-no-border'] : styles['prefix']}>
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
          <p key={index} className={`${styles['errorMsg']} ${styles['msg']}`}>
            {e}
          </p>
        ))}
      {hints &&
        hints.map((hint, index) => (
          <p key={index} className={`${styles['hintMsg']} ${styles['msg']} ${hintCustomClass}`}>
            {!hint.hide && hint.hint}
          </p>
        ))}
      {isValid && validMessage && <p className={`${styles['successMsg']} ${styles['msg']}`}>{validMessage}</p>}
    </div>
  );
};

export default Input;
