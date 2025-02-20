import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from 'src/modules/Layout/components/Footer';

import Header from './containers/Header';
export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
