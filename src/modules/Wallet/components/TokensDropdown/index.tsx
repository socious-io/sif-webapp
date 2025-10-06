import { CURRENCIES } from 'src/constants/CURRENCIES';

import styles from './index.module.scss';
import { TokensDropdownProps } from './index.types';

const TokensDropdown: React.FC<TokensDropdownProps> = ({ open, onClose, tokens, onSelectToken }) => {
  return (
    <div className={`${styles['dropdown']} ${open && styles['dropdown--open']}`}>
      {tokens.map(token => {
        const label = CURRENCIES.find(t => t.value === token)?.label || token;
        return (
          <div
            key={token}
            className={styles['dropdown__item']}
            onClick={e => {
              e.stopPropagation();
              onSelectToken(token);
              onClose();
            }}
          >
            <img src={`/icons/token-symbols/${label}.png`} width={18} height={18} alt={label} />
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default TokensDropdown;
