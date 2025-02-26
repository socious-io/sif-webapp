import Button from 'src/modules/General/components/Button';
import ConnectButton from 'src/modules/General/components/ConnectButton';
import SuccessModal from 'src/modules/General/SuccessModal';

import { useCreatePreview } from './useCreatePreview';

const styles = {
  banner: 'w-full h-[120px] rounded-[16px]',
  titles: 'text-[14px] font-medium mt-[20px] mb-[8px]',
  values: 'text-[16px] font-medium ',
};
const CreatePreview: React.FC = () => {
  const {
    name,
    description,
    location,
    socialCauses,
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
        <div className="text-[20px] font-medium my-[20px]">{name}</div>
        <div className={styles.titles}>Social cause</div>
        <div className={styles.values}>
          {socialCauses.map((cause, index) => (
            <span key={index}>{cause.label} </span>
          ))}
        </div>
        <div className={styles.titles}>Website</div>
        <div className={styles.values}>{website}</div>
        <div className={styles.titles}>Location</div>
        <div className={styles.values}>{location}</div>

        <Button color="primary" block type="submit" onClick={() => setShowSuccessModal(true)}>
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
