import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { CurrentIdentity } from 'src/core/api';
import Footer from 'src/modules/Layout/components/Footer';
import { RootState } from 'src/store';

import Header from './containers/Header';
import VerifyTopBanner from './containers/VerifyTopBanner';

export const Layout = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const shouldPlayBanner = currentIdentity?.type === 'organizations' && !currentIdentity.meta?.verified;
  return (
    <>
      <Header />
      {shouldPlayBanner && <VerifyTopBanner />}
      <Outlet />
      <Footer />
    </>
  );
};
