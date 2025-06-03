import React from "react";
import Logo from "./Logo";
import MainFooter from "./MainFooter";
import Sidebar from "./Sidebar";

const Layout = ({ children, pageData }) => {
  // const [pageData, setPageData] = useState([]);
  // useEffect(() => {
  //   console.log("Fetching pages data...");
  //   getPages().then((res) => {
  //     setPageData(res.pages);
  //     console.log("Pages data fetched:", res.pages);
  //   }).catch((error) => {
  //     console.error("Error fetching pages:", error);
  //   });
  // }, []);

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
