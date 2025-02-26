import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';

import { useUploadBannerForm } from './useUploadBannerForm';

const UploadBannerForm: React.FC = () => {
  const { attachments, navigateStep4, goBack, onDropFiles } = useUploadBannerForm();
  return (
    <>
      <form>
        <div className="h-full">
          <div>Cover photo</div>
          <FileUploader
            files={attachments}
            onDropFiles={onDropFiles}
            fileTypes={['PNG', 'JPG', 'GIF']}
            maxSize={2}
            showFileName={false}
          />
        </div>
        <Button color="primary" block onClick={navigateStep4}>
          Continue
        </Button>
        <Button onClick={goBack} color="secondary" block variant="outlined" customStyle="mt-[16px]">
          Back
        </Button>
      </form>
    </>
  );
};
export default UploadBannerForm;
