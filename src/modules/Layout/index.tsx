import { Outlet } from 'react-router-dom';
import Footer from 'src/modules/Layout/components/Footer';

import Header from './containers/Header';
import VerifyTopBanner from './containers/VerifyTopBanner';
import ScrollToTop from '../General/components/ScrollToTop';

export const Layout = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <VerifyTopBanner />
      <Outlet />
      <Footer />
    </>
  );
};
