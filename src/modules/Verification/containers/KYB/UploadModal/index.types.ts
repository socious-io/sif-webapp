export type FileState = {
  id: string;
  file: File;
  progress: number;
  error: boolean;
};

export interface UploadModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpenSuccessModal: () => void;
}
