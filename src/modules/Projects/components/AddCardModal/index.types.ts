import { Card } from 'src/core/api';

export interface AddCardModalProps {
  open: boolean;
  handleClose: () => void;
  onSelectCard: (card) => void;
}
