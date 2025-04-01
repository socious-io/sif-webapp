import { Files } from 'src/core/adaptors';

export interface EditImageModalProps {
  open: boolean;
  handleClose: () => void;
  aspectRatio: number;
  onSave: (editedFile: File) => void;
  file: Files | null;
}
