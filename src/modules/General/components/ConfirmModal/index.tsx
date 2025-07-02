import Button from 'src/modules/General/components/Button';
import Modal from 'src/modules/General/components/Modal';

import styles from './index.module.scss';
import { ConfirmModalProps } from './index.types';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  handleClose,
  confirmHeader,
  confirmSubheader = '',
  buttons = [],
  headerDivider = false,
  footerDivider = false,
  mobileCentered = true,
  contentClassName = '',
  footerClassName = '',
  ...props
}) => {
  const footerJSX = !!buttons.length && (
    <div className={`${styles['content__buttons']} ${footerClassName}`}>
      {buttons.map((button, index) => (
        <Button key={index} {...button} />
      ))}
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      headerDivider={headerDivider}
      footerDivider={footerDivider}
      mobileCentered={mobileCentered}
      contentClassName={`${styles['content']} ${contentClassName}`}
      footer={footerJSX}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <span className={styles['content__title']}>{confirmHeader}</span>
        <span className={styles['content__subtitle']}>{confirmSubheader}</span>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
