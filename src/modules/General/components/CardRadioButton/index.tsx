import { Radio, RadioGroup } from '@mui/material';

import styles from './index.module.scss';
import { CardRadioButtonProps } from './index.types';

const CardRadioButton: React.FC<CardRadioButtonProps> = ({
  items,
  selectedValue,
  setSelectedValue,
  direction = 'row',
  customStyle = '',
  containerClassName = '',
  titleClassName = '',
}) => {
  const isColDirection = direction === 'col';
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <RadioGroup className={`gap-3 ${customStyle}`}>
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => !item.disabled && setSelectedValue(item.value)}
          className={`${styles['container']} 
          ${selectedValue === item.value && !item.disabled && styles['container--selected']} 
          ${item.disabled && styles['container--disabled']} 
          ${containerClassName}`}
        >
          <Radio
            id={item.id}
            value={item.value}
            checked={selectedValue === item.value}
            onChange={handleChange}
            disabled={item.disabled}
            size={item?.radioSize || 'medium'}
            className={`p-0 ${isColDirection && styles['radio']}`}
          />
          <div className={`${styles['wrapper']} ${isColDirection && styles['wrapper--col']}`}>
            {item.icon}
            <div className={styles['content']}>
              <div className={`${styles['content__title']} ${titleClassName}`}>{item.title}</div>
              {item.description && (
                <div className={styles['content__desc']}>{item.description && item.description}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </RadioGroup>
  );
};

export default CardRadioButton;
