import React from 'react';
import { truncateFromMiddle } from 'src/core/helpers/texts';

import styles from './index.module.scss';

const WalletAddress = ({ address }) => {
  return (
    <div className={styles['wallet-address']}>
      <span className={styles['wallet-address__text']}>{address}</span>
    </div>
  );
};

export default WalletAddress;
