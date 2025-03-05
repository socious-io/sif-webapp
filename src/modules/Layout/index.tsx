import { Outlet } from 'react-router-dom';
import Footer from 'src/modules/Layout/components/Footer';

import Header from './containers/Header';
import VerifyTopBanner from './containers/VerifyTopBanner';

export const Layout = () => {
  return (
    <>
      <Header />
      <VerifyTopBanner />
      <Outlet />
      <Footer />
    </>
  );
};
