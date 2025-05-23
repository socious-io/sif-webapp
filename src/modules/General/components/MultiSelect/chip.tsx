import styles from './index.module.scss';
import { CustomChipProps } from './index.types';

const Chip: React.FC<CustomChipProps> = props => {
  const { label, onClick, icon, bgColor, fontColor, borderColor, customStyle } = props;
  const handleEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onClick(label);
    }
  };
  return (
    <div
      data-testid="chip"
      className={`${styles['chip']} ${customStyle}`}
      style={{ borderColor: borderColor ? borderColor : '', backgroundColor: bgColor || '' }}
      onClick={() => onClick(label)}
      onKeyDown={handleEnter}
      tabIndex={0}
    >
      <span className={`${styles['chipLabel']} !font-medium`} style={{ color: fontColor || '' }}>
        {label}
      </span>
      <div style={{ marginRight: 0, marginLeft: 'auto' }}>{icon}</div>
    </div>
  );
};

export default Chip;
