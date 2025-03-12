import { translate } from 'src/core/helpers/utils';
import BackLink from 'src/modules/General/components/BackLink';
import Button from 'src/modules/General/components/Button';

import styles from './index.module.scss';
import { ServiceCreateHeaderProps } from './index.types';

const ProjectEditHeader: React.FC<ServiceCreateHeaderProps> = ({ isEdit = false, onPublish, onDiscard, disabled }) => {
  return (
    <div className={styles['container']}>
      <BackLink title={translate('project-edit-back')} customStyle="w-fit p-0" onBack={() => onDiscard('back')} />
      <div className={styles['header']}>
        <div className={styles['header__title']}>
          <h1>{translate('project-edit-title')}</h1>
        </div>
        <div className={styles['header__actions']}>
          <Button color="info" variant="outlined" onClick={() => onDiscard('cancel')} customStyle="w-full">
            {translate('project-edit-cancel')}
          </Button>
          <Button color="primary" variant="contained" onClick={onPublish} disabled={disabled} customStyle="w-full">
            {translate('project-edit-publish')}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProjectEditHeader;
