export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL,
  sociousWorkBaseURL: import.meta.env.VITE_BASE_URL_SOCIOUS_WORK,
  sociousIDBaseURL: import.meta.env.VITE_BASE_URL_SOCIOUS_ID,
  accessExpire: import.meta.env.VITE_ACCESS_EXPIRE,
  refreshExpire: import.meta.env.VITE_REFRESH_EXPIRE,
  appBaseURL: import.meta.env.VITE_APP_URL,
  accountCenterURL: import.meta.env.VITE_ACCOUNT_CENTER_URL,
  dappENV: import.meta.env.VITE_DAPP_ENV,
  datadogAppId: import.meta.env.VITE_DATADOG_APP_ID,
  datadogClientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
  payoutDonationsAddress: import.meta.env.VITE_PAYOUT_DONATIONS_ADDRESS,
  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY,
  rates: {
    ada: import.meta.env.VITE_CARDANO_ADA_RATE,
  },
};

export const isTestingEnvironment = config.env === 'test';
