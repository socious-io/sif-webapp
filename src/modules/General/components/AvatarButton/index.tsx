import AvatarLabelGroup from '../AvatarLabelGroup';
import { AvatarButtonProps } from './index.types';

const AvatarButton: React.FC<AvatarButtonProps> = ({ account, onClick }) => {
  return (
    <button
      className="flex flex-col items-start p-3 border border-solid border-Gray-light-mode-200 rounded-lg cursor-pointer"
      onClick={() => onClick(account)}
    >
      <AvatarLabelGroup account={account} />
    </button>
  );
};

export default AvatarButton;
