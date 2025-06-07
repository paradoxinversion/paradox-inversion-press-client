import React from "react";
import SidebarNavButton from "./SidebarNavButton";

const Sidebar = ({ pages }) => {
  return (
    <div id="sidebar" className="container flex overflow-x-auto md:sidebar md:max-w-48 md:min-w-48 md:flex-col ">
      {pages ? (
        pages
          .filter((page) => page.showInNav)
          .map((page) => (
            <SidebarNavButton
              key={`page-${page.url}`}
              text={page.title}
              url={page.url}
            />
          ))
      ) : (
        <div>Loading pages</div>
      )}
    </div>
  );
};

export default Sidebar;
