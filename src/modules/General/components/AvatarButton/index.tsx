import React from 'react';

import AvatarLabelGroup from '../AvatarLabelGroup';
import { AvatarButtonProps } from './index.types';
import { useAvatarButton } from './useAvatarButton';

const AvatarButton: React.FC<AvatarButtonProps> = ({ account, onClick }) => {
  const { adaptToAccountItem } = useAvatarButton();
  return (
    <button
      className="flex flex-col items-start p-3 border border-solid border-Gray-light-mode-200 rounded-lg cursor-pointer"
      onClick={() => onClick(account)}
    >
      <AvatarLabelGroup account={adaptToAccountItem(account)} />
    </button>
  );
};

export default AvatarButton;
