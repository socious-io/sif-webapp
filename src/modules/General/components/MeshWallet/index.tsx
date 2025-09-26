import { BlockfrostProvider } from '@meshsdk/provider';
import { Web3Wallet, EnableWeb3WalletOptions } from '@meshsdk/web3-sdk';
import { useState } from 'react';
import { config } from 'src/config';
import { truncateFromMiddle } from 'src/core/helpers/texts';

import styles from './index.module.scss';
import Button from '../Button';

async function initializeWallet() {
  try {
    const provider = new BlockfrostProvider(config.blockfrostProjectId);

    // Configure UTXOS wallet options
    const options: EnableWeb3WalletOptions = {
      networkId: 0, // 0: preprod, 1: mainnet
      projectId: '6cc09382-1b96-4280-a3a5-b2ba5a32d3b8', // https://utxos.dev/dashboard
      fetcher: provider,
      submitter: provider,
      keepWindowOpen: true,
    };

    // Enable the wallet
    const wallet = await Web3Wallet.enable(options);

    console.log('Multi-chain wallet initialized successfully with', wallet.cardano, wallet.bitcoin);
    return wallet;
  } catch (error) {
    console.error('Failed to initialize wallet:', error);
    throw error;
  }
}

const MeshWallet = () => {
  const [wallet, setWallet] = useState<Web3Wallet | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [error, setError] = useState('');

  const formattedBalance = balance !== null ? Number(balance.toFixed(3)).toLocaleString() : '';

  // Connect wallet (supports social logins)
  const connectWallet = async () => {
    setError('');
    setConnecting(true);
    try {
      const w = await initializeWallet();
      console.log(w);
      setWallet(w);
      setConnected(true);

      // Get address
      const addr = await w.cardano.getChangeAddress();
      if (!addr || addr.length < 8) {
        throw new Error('Wallet did not return a valid address');
      }
      setAddress(addr);

      // Fetch balance
      const utxos = await w.cardano.getUtxos();
      const totalLovelace = utxos.reduce((sum, utxo) => {
        const lovelace = utxo.output.amount.find(a => a.unit === 'lovelace');
        return sum + parseInt(lovelace?.quantity || '0');
      }, 0);
      setBalance(totalLovelace / 1_000_000);
    } catch (err) {
      console.error(err);
      setError('Failed to connect wallet');
    } finally {
      setConnecting(false);
    }
  };

  return (
    <>
      {!connected ? (
        <div className={styles.connect}>
          <Button color="info" block onClick={connectWallet}>
            {connecting ? 'Connecting...' : 'Connect Cardano Wallet'}
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <Button color="info" block customStyle={styles.button} onClick={() => console.log('disconnect')}>
          <div className={styles.symbol}>
            <img src={`/icons/token-symbols/ADA.png`} width={18} height={18} alt="ADA" />
          </div>
          <div className={`${styles.address} ${styles['address--connected']}`}>
            <span className={styles.balance}>{formattedBalance} ADA</span>
            {truncateFromMiddle(address, 5, 5)}
          </div>
        </Button>
      )}
    </>
  );
};

export default MeshWallet;
