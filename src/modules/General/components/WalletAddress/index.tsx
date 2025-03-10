import React from 'react';

import styles from './index.module.scss';

const shortenAddress = address => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-6)}`;
};

const WalletAddress = ({ address }) => {
  return (
    <div className={styles['wallet-address']}>
      <span className={styles['wallet-address__text']}>{shortenAddress(address)}</span>
    </div>
  );
};

export default WalletAddress;
