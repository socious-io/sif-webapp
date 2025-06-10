import marker from 'src/assets/icons/location-marker.svg';
import { convertMarkdownToJSX } from 'src/core/helpers/convert-md-to-jsx';
import { translate } from 'src/core/helpers/utils';
import Button from 'src/modules/General/components/Button';
import SuccessModal from 'src/modules/General/components/SuccessModal';

import { useCreatePreview } from './useCreatePreview';

const styles = {
  banner: 'w-full rounded-[16px]',
  titles: 'text-[14px] font-medium mt-[20px] mb-2',
  values: 'text-[16px] font-medium flex',
};
const CreatePreview: React.FC = () => {
  const {
    title,
    description,
    city,
    country,
    social_cause,
    website,
    goBack,
    showSuccessModal,
    onPublish,
    onCloseModal,
    cover_url,
  } = useCreatePreview();
  return (
    <>
      <div className="pb-12">
        <img src={cover_url} alt="banner" className={styles.banner} />
        <div className="text-[20px] font-medium my-5 border-b border-b-Gray-light-mode-300 border-solid border-t-0 border-l-0 border-r-0 pb-5">
          {title}
        </div>
        <div className={styles.titles}>{translate('create-preview-social-cause')}</div>
        <div className={styles.values}>
          <span>{translate(social_cause)}</span>
        </div>
        <div className={styles.titles}>{translate('create-preview-website')}</div>
        <div className={styles.values}>{website}</div>
        {city && (
          <>
            <div className={styles.titles}>{translate('create-preview-location')}</div>
            <div className={styles.values}>
              <img src={marker} className="mr-3" /> {country}, {city}
            </div>
          </>
        )}
        <div className="text-[20px] font-medium mt-5 pt-5 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0 pb-5">
          {translate('create-preview-overview')}
        </div>
        <div className={styles.values}>{convertMarkdownToJSX(description)}</div>
        <Button color="primary" block type="submit" onClick={onPublish} customStyle="mt-9">
          {translate('publish-button')}
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-4" onClick={goBack}>
          {translate('back-button')}
        </Button>
      </div>
      <SuccessModal
        open={showSuccessModal}
        message={translate('create-preview-success-message')}
        title={translate('create-preview-success-title')}
        handleClose={onCloseModal}
      />
    </>
  );
};
export default CreatePreview;
