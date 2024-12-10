import React, { Children, useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import MainFooter from "./MainFooter";
import useSWR from "swr";
import { getPages } from "utils/actions";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [pageData, setPageData] = useState([]);
  useEffect(() => {
    getPages().then((res) => {
      setPageData(res.pages);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <Logo />
      <Sidebar pages={pageData} />
      <div className="flex flex-col flex-grow">{children}</div>
      <MainFooter />
    </div>
  );
};

export default Layout;
