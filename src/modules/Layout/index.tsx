import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from 'src/modules/Layout/components/Footer';

import Header from './containers/Header';
import VerifyTopBanner from './containers/VerifyTopBanner';

export const Layout = () => {
  const { pathname } = useLocation();
  const excludeTopBannerRoutes = ['/create/*'];
  const shouldExcludeTopBanner = excludeTopBannerRoutes.some(route =>
    route.endsWith('/*') ? pathname.startsWith(route.replace('/*', '')) : pathname === route,
  );

  return (
    <>
      <Header />
      {!shouldExcludeTopBanner && <VerifyTopBanner />}
      <Outlet />
      <Footer />
    </>
  );
};
