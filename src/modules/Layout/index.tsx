import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./containers/Header";
import Footer from 'src/modules/Layout/components/Footer'
export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
