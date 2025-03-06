import marker from 'src/assets/icons/location-marker.svg';
import Button from 'src/modules/General/components/Button';
import ConnectButton from 'src/modules/General/components/ConnectButton';
import SuccessModal from 'src/modules/General/SuccessModal';

import { useCreatePreview } from './useCreatePreview';

const styles = {
  banner: 'w-full h-[120px] rounded-[16px]',
  titles: 'text-[14px] font-medium mt-[20px] mb-[8px]',
  values: 'text-[16px] font-medium flex',
};
const CreatePreview: React.FC = () => {
  const {
    name,
    description,
    city,
    country,
    socialCause,
    coverImage,
    website,
    goBack,
    showSuccessModal,
    setShowSuccessModal,
  } = useCreatePreview();
  return (
    <>
      <div>
        <img src={coverImage} alt="banner" className={styles.banner} />
        <div className="text-[20px] font-medium my-[20px] border-b border-b-Gray-light-mode-300 border-solid border-t-0 border-l-0 border-r-0 pb-5">
          {name}
        </div>
        <div className={styles.titles}>Social cause</div>
        <div className={styles.values}>
          <span>{socialCause} </span>
        </div>
        <div className={styles.titles}>Website</div>
        <div className={styles.values}>{website}</div>
        <div className={styles.titles}>Location</div>
        <div className={styles.values}>
          <img src={marker} className="mr-3" /> {country}, {city}
        </div>
        <div className="text-[20px] font-medium mt-5 pt-5 border-t border-t-Gray-light-mode-300 border-solid border-b-0 border-l-0 border-r-0 pb-5">
          Overview
        </div>
        <div className={styles.values}>{description}</div>
        <Button color="primary" block type="submit" onClick={() => setShowSuccessModal(true)} customStyle="mt-9">
          Publish
        </Button>
        <Button color="secondary" block variant="outlined" customStyle="mt-[16px]" onClick={goBack}>
          Back
        </Button>
      </div>
      <SuccessModal
        open={showSuccessModal}
        message="Your project has been successfully published!"
        title="Congrats!"
        handleClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};
export default CreatePreview;
