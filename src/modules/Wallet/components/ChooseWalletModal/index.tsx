import { translate } from 'src/core/helpers/utils';
import Modal from 'src/modules/General/components/Modal';

import styles from './index.module.scss';
import { ChooseWalletModalProps } from './index.types';

const ChooseWalletModal: React.FC<ChooseWalletModalProps> = ({
  open,
  handleClose,
  title = translate('wallet.connect'),
  headerDivider = false,
  footerDivider = false,
  mobileCentered = false,
  mobileFullHeight = false,
  wallets,
  onWalletSelect,
  ...props
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={title}
      headerDivider={headerDivider}
      footerDivider={footerDivider}
      mobileCentered={mobileCentered}
      mobileFullHeight={mobileFullHeight}
      customStyle="md:max-w-[480px] md:!max-h-[504px]"
      contentClassName="py-4 md:py-6"
      {...props}
    >
      <div className={styles['wallets']}>
        {wallets.map(wallet => (
          <div key={wallet.name} className={styles['wallet']} onClick={() => onWalletSelect(wallet)}>
            <img src={wallet.icon} alt={wallet.name} width={42} height={42} className="cursor-pointer" />
            {wallet.name}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ChooseWalletModal;
