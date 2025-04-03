import { Typography } from '@mui/material';

import Icon from '../Icon';
import { IconListItemProps } from './index.types';

const IconListItem: React.FC<IconListItemProps> = ({ iconName, label, onClick, customIconClass, customLabelClass }) => {
  return (
    <div className="w-full h-[50px] flex py-[13px] px-[10px] gap-3 cursor-pointer" onClick={onClick}>
      {iconName && <Icon name={iconName} fontSize={16} className={`text-Gray (light mode)-700 ${customIconClass}`} />}
      <Typography variant="subtitle1" className={`text-Gray (light mode)-700 ${customLabelClass} `}>
        {label}
      </Typography>
    </div>
  );
};

export default IconListItem;
