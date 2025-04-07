import { LinearProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

import styles from './index.module.scss';

const RequestLoading = () => {
  const isLoading = useSelector<RootState, boolean>(state => state.loading);

  return (
    <div className={`${styles['container']} ${isLoading && styles['container--visible']}`}>
      <LinearProgress color="primary" />
    </div>
  );
};

export default RequestLoading;
