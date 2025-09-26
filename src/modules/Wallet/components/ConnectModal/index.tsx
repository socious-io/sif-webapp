import { translate } from 'src/core/helpers/utils';
import Icon from 'src/modules/General/components/Icon';
import Modal from 'src/modules/General/components/Modal';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ConnectModalProps } from './index.types';

const ConnectModal: React.FC<ConnectModalProps> = ({
  open,
  handleClose,
  symbol,
  address,
  formattedBalance,
  showBalance = true,
  handleDisconnect,
  handleCopy,
  footer,
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      footer={footer}
      headerDivider={false}
      footerDivider={false}
      mobileCentered
      customStyle={styles['modal']}
      contentClassName={styles['modal__content']}
    >
      <>
        <img src={`/icons/token-symbols/${symbol}.png`} width={48} height={48} alt={symbol} />
        <div className={styles['address']}>
          {address}
          {showBalance && (
            <span className={styles['balance']}>
              {formattedBalance} {symbol}
            </span>
          )}
        </div>
        <div className={styles['buttons']}>
          <button onClick={handleDisconnect} className={styles['button']}>
            <Icon name="x-close" fontSize={20} color={variables.color_grey_700} />
            {translate('wallet.disconnect')}
          </button>
          <button onClick={handleCopy} className={styles['button']}>
            <Icon name="copy-02" fontSize={20} color={variables.color_grey_700} />
            {translate('wallet.copy-address')}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default ConnectModal;
