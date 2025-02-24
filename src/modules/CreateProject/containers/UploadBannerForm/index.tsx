import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';
import Input from 'src/modules/General/components/Input';

import { useUploadBannerForm } from './useUploadBannerForm';

const UploadBannerForm: React.FC = () => {
  const { attachments, navigateStep4 } = useUploadBannerForm();
  return (
    <div>
      <form>
        <div>Cover photo</div>
        <FileUploader
          files={attachments}
          onDropFiles={() => {}}
          fileTypes={['PNG', 'JPG', 'GIF']}
          maxSize={2}
          showFileName={false}
        />
        <Button color="primary" block onClick={navigateStep4}>
          Continue
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-[16px]">
          Cancel
        </Button>
      </form>
    </div>
  );
};
export default UploadBannerForm;
