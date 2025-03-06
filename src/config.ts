export const config = {
  env: import.meta.env.VITE_ENV,
  baseURL: import.meta.env.VITE_BASE_URL,
  sociousWorkBaseURL: import.meta.env.VITE_BASE_URL_SOCIOUS_WORK,
  accessExpire: import.meta.env.VITE_ACCESS_EXPIRE,
  refreshExpire: import.meta.env.VITE_REFRESH_EXPIRE,
  appBaseURL: import.meta.env.VITE_APP_URL,
  dappENV: import.meta.env.VITE_DAPP_ENV,
  datadogAppId: import.meta.env.VITE_DATADOG_APP_ID,
  datadogClientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN,
};

export const isTestingEnvironment = config.env === 'test';
