import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ProgressFileUploaderProps } from './index.types';
import { useProgressFileUploader } from './useProgressFileUploader';
import Icon from '../Icon';

const ProgressFileUploader: React.FC<ProgressFileUploaderProps> = ({
  files,
  fileTypes,
  onDropFiles,
  onDeleteFiles,
  showProgress = true,
  progressValues = null,
  uploadedErrors = null,
  maxSize = 10,
  maxFiles = 1,
  error = '',
  loading = false,
  multiple = true,
  customText = '',
  showSubtitle = true,
  customStyle = '',
}) => {
  const {
    data: { translate, subtitle, errorMessage },
    operations: { generateFileSize, getIconByType, getRootProps, getInputProps },
  } = useProgressFileUploader(files, fileTypes, onDropFiles, maxSize, maxFiles, error, multiple);

  return (
    <>
      {loading ? (
        <div className={styles['loading']}>
          <CircularProgress size="4rem" color="primary" />
        </div>
      ) : (
        <div className={styles['container']}>
          <div {...getRootProps()} className={`${styles['upload']} ${customStyle}`}>
            <input {...getInputProps()} />
            <Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_600} />
            <div className="flex">
              <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
                {translate('general-file-uploader.click')}
              </Typography>
              <Typography variant="caption" color={variables.color_grey_600}>
                {customText || translate('general-file-uploader.drag')}
              </Typography>
            </div>
            {showSubtitle && <p className={styles['upload__subtitle']}>{subtitle}</p>}
          </div>
          {errorMessage && (
            <Typography variant="caption" color={variables.color_error_600}>
              {errorMessage}
            </Typography>
          )}
          {!!files.length && (
            <div className={styles['list']}>
              <div className={styles['list__files']}>
                {files.map((item, index) => (
                  <div
                    key={`${item.id}${index}`}
                    className={`${styles['file']} ${uploadedErrors?.[item.id] && styles['file--error']}`}
                  >
                    {getIconByType(item.file.type) && (
                      <img src={getIconByType(item.file.type)} alt={item.file.type} width={40} height={40} />
                    )}
                    <div className={styles['file__right']}>
                      <div className={styles['file__info']}>
                        {item.file.name}
                        <Icon
                          name="trash-01"
                          fontSize={20}
                          color={variables.color_grey_500}
                          cursor="pointer"
                          className={styles['file__delete']}
                          onClick={() => onDeleteFiles(item.id)}
                        />
                      </div>
                      {showProgress && progressValues && (
                        <div className={styles['file__percentage']}>
                          <LinearProgress
                            variant="determinate"
                            className={styles['file__progress']}
                            value={progressValues[item.id] || 0}
                          />
                          {progressValues[item.id]}%
                        </div>
                      )}
                      <span className={styles['file__size']}>{generateFileSize(item.file.size)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProgressFileUploader;
