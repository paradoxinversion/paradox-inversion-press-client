import React from "react";
import Logo from "./Logo";
import MainFooter from "./MainFooter";
import Sidebar from "./Sidebar";
import Head from 'next/head'
const Layout = ({ children, pageData }) => {

  return (
    <div className="flex flex-col min-h-screen p-4">
      <Head>
        <title>Paradox Inversion Press</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Logo />
      <div className="h-full flex-grow md:flex">
        <Sidebar pages={pageData} />
        <div className="flex flex-col flex-grow md:w-3/4">{children}</div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Layout;
