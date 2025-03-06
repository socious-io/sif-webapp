import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { config } from 'src/config';
import { AuthRes } from 'src/core/adaptors';
import { getAuthUrlAdaptor, sociousOauthAdaptor } from 'src/core/adaptors/auth/index.adaptors';
import { setAuthParams } from 'src/core/api/auth/auth.service';
// import store from 'src/store';
// import { setUserProfile } from 'src/store/reducers/user.reducer';

export const SociousID = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const fetchAuthURL = async () => {
    const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + '/oauth/socious');
    if (error) return;
    else if (data) return data.url;
  };

  async function onLoginSucceed(loginRes: AuthRes) {
    await setAuthParams(loginRes, true);
    //FIXME: set identity later BE provide us
    navigate('/');
    return loginRes;
  }

  useEffect(() => {
    const handleSociousOauth = async (authCode: string) => {
      const { error, data } = await sociousOauthAdaptor(authCode);
      if (error) navigate('/intro');
      else if (data) onLoginSucceed(data);
    };

    const redirectToAuthURL = async () => {
      const authURL = await fetchAuthURL();
      if (authURL) {
        window.location.href = authURL;
      }
    };

    if (!code) {
      redirectToAuthURL();
      return;
    }

    handleSociousOauth(code);
  }, [code]);

  return null;
};
