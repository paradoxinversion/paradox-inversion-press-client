import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import MainFooter from "./MainFooter";
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
      <div className="flex h-full flex-grow">
        <Sidebar pages={pageData} />
        <div className="flex flex-col flex-grow sm:w-3/4">{children}</div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Layout;
