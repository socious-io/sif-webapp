import { BrowserWallet, Wallet } from '@meshsdk/core';
import { useState } from 'react';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import Dapp from 'src/core/dapp';
import { truncateFromMiddle } from 'src/core/helpers/texts';
import { translate } from 'src/core/helpers/utils';
import AlertModal from 'src/modules/General/components/AlertModal';
import Button from 'src/modules/General/components/Button';
import FeaturedIcon from 'src/modules/General/components/FeaturedIcon';
import Icon from 'src/modules/General/components/Icon';
import IconButton from 'src/modules/General/components/IconButton';
import ChooseWalletModal from 'src/modules/Wallet/components/ChooseWalletModal';
import ConnectModal from 'src/modules/Wallet/components/ConnectModal';
import TokensDropdown from 'src/modules/Wallet/components/TokensDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { CardanoWallet, ConnectButtonProps } from './index.types';

const ConnectButton: React.FC<ConnectButtonProps> = ({ showBalance = true }) => {
  const { address, connected, balances, setupCardanoConnection, disconnect } = Dapp.useWeb3();

  const [availableWallets, setAvailableWallets] = useState<CardanoWallet[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedToken, setSelectedToken] = useState('lovelace');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [error, setError] = useState('');

  const selectedTokenLabel = CURRENCIES.find(t => t.value === selectedToken)?.label || '';
  const formattedBalance =
    balances !== null ? Number(balances[selectedToken]?.total.toFixed(3)).toLocaleString() : '0.00';
  const hasDifferentTokens = balances && Object.keys(balances).length > 1;

  const handleClick = async () => {
    if (connected) return;

    const cardanoWallets: Wallet[] = await BrowserWallet.getAvailableWallets();
    const wallets = [...(cardanoWallets.map(wallet => ({ ...wallet, type: 'cardano' })) as CardanoWallet[])];

    if (!wallets.length) {
      setError(translate('wallet-not-installed-error'));
      return;
    }
    if (wallets.length === 1) {
      const wallet = wallets[0];
      setupCardanoConnection(wallet.name);
    } else {
      setAvailableWallets(wallets);
      setIsModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowMenu(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setShowMenu(false);
  };

  const connectWalletJSX = (
    <>
      {showBalance && connected && (
        <div
          className={`${styles['symbol']} ${hasDifferentTokens && styles['symbol--clickable']}`}
          onClick={e => {
            e.stopPropagation();
            setOpenDropdown(prev => !prev);
          }}
        >
          <img src={`/icons/token-symbols/${selectedTokenLabel}.png`} width={18} height={18} alt={selectedTokenLabel} />
          <span className={styles['balance']}>
            {formattedBalance} {selectedTokenLabel}
          </span>
          {hasDifferentTokens && (
            <>
              <Icon
                name={openDropdown ? 'chevron-up' : 'chevron-down'}
                fontSize={20}
                color={variables.color_grey_600}
                cursor="pointer"
              />
              <TokensDropdown
                open={openDropdown}
                onClose={() => setOpenDropdown(false)}
                tokens={Object.keys(balances)}
                onSelectToken={setSelectedToken}
              />
            </>
          )}
        </div>
      )}
      {showBalance && connected && <div className={styles['divider']} />}
      <div className={`${styles['address']} ${connected && styles['address--connected']}`}>
        {address ? (
          <div className={styles['address__connected']}>
            <div className={styles['address__dot']} />
            <div className={styles['address__info']}>
              <Icon name="wallet-02" fontSize={18} color={variables.color_grey_600} />
              {truncateFromMiddle(address, 5, 5)}
            </div>
            <IconButton
              size="small"
              iconName="dots-vertical"
              iconSize={18}
              iconColor={variables.color_grey_600}
              customStyle={styles['address__action']}
              onClick={() => setShowMenu(true)}
            />
          </div>
        ) : (
          translate('wallet.connect')
        )}
      </div>
    </>
  );

  return (
    <>
      <div className="relative">
        <Button color="info" onClick={handleClick} block customStyle={styles['button']}>
          {connectWalletJSX}
        </Button>
        {connected && (
          <ConnectModal
            open={showMenu}
            handleClose={() => setShowMenu(false)}
            symbol={selectedTokenLabel}
            address={truncateFromMiddle(address, 5, 5)}
            formattedBalance={formattedBalance}
            showBalance={showBalance}
            handleDisconnect={() => {
              handleDisconnect();
              setShowMenu(false);
            }}
            handleCopy={handleCopy}
          />
        )}
        {!!availableWallets.length && (
          <ChooseWalletModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            wallets={availableWallets}
            onWalletSelect={wallet => {
              setupCardanoConnection(wallet.name);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
      <AlertModal
        open={!!error}
        onClose={() => setError('')}
        title={translate('wallet.failed')}
        message={error}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButton={false}
        submitButton={false}
      />
    </>
  );
};

export default ConnectButton;
