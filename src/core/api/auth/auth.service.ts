import { config } from 'src/config';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { identities } from './auth.api';
import { AuthSession } from './auth.types';

export async function setAuthParams(auth: AuthSession, keepLoggedIn?: boolean) {
  await nonPermanentStorage.set(
    { key: 'access_token', value: auth.access_token },
    keepLoggedIn ? Number(config.accessExpire) : undefined,
  );
  await nonPermanentStorage.set(
    { key: 'refresh_token', value: auth.refresh_token },
    keepLoggedIn ? Number(config.refreshExpire) : undefined,
  );
  await nonPermanentStorage.set(
    { key: 'token_type', value: auth.token_type },
    keepLoggedIn ? Number(config.refreshExpire) : undefined,
  );
  //when user logs in first time we set the identity to the first identity
  const new_identities = await identities();
  await dispatch(setIdentityList(new_identities));
}
const dispatch = store.dispatch;
export const switchAccount = async (accountId: string) => {
  await nonPermanentStorage.set({ key: 'identity', value: accountId });
  const new_identities = await identities();
  await dispatch(setIdentityList(new_identities));
};

// export async function refreshToken() {
//   const token = await nonPermanentStorage.get('refresh_token');
//   if (!token) throw new Error('could not find refresh token');

//   await setAuthParams(await refresh({ refresh_token: token }));
// }
