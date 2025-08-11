import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import Modal from 'src/modules/General/components/Modal';

import { AddCardModalProps } from './index.types';
import { useAddCardModal } from './useAddCardModal';

const AddCardModal: React.FC<AddCardModalProps> = ({ open, handleClose, onSelectCard }) => {
  const {
    operations: { onSubmit },
  } = useAddCardModal(open, handleClose, onSelectCard);

  const footerJSX = (
    <div className="w-full p-4 md:p-6">
      <Button color="primary" variant="contained" onClick={onSubmit} fullWidth>
        {translate('cont-add-btn')}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={translate('cont-add-credit-card')}
        mobileFullHeight={false}
        footer={footerJSX}
      >
        <div className="p-4 md:p-6">
          <div id="card-element" />
        </div>
      </Modal>
    </>
  );
};

export default AddCardModal;
