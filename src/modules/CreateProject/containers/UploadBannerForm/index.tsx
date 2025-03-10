import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import FileUploader from 'src/modules/General/components/FileUploader';

import { useUploadBannerForm } from './useUploadBannerForm';

const UploadBannerForm: React.FC = () => {
  const { attachments, navigateStep4, goBack, onDropFiles, isEnabled } = useUploadBannerForm();
  return (
    <div className="flex flex-col justify-between md:h-[560px] h-full ">
      <div className="hidden md:block" />
      <div>
        <div className="text-secondary-700 text-[16px] font-semibold mb-[6px]">{translate('cover-photo-label')}</div>
        <FileUploader
          files={attachments}
          onDropFiles={onDropFiles}
          fileTypes={['PNG', 'JPG', 'GIF']}
          maxSize={2}
          showFileName={false}
        />
      </div>
      <div>
        <Button color="primary" block onClick={navigateStep4} disabled={isEnabled}>
          {translate('continue-button')}
        </Button>
        <Button onClick={goBack} color="secondary" block variant="text" customStyle="mt-[16px]">
          {translate('back-button')}
        </Button>
      </div>
    </div>
  );
};
export default UploadBannerForm;
