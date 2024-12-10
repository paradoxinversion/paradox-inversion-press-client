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
        <div className="w-2/12 mr-4">
          <Sidebar pages={pageData} />
        </div>
        <div className="flex flex-col flex-grow w-10/12">{children}</div>
      </div>
      <MainFooter />
    </div>
  );
};

export default Layout;
