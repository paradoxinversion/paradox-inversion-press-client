import React from "react";
import SidebarNavButton from "./SidebarNavButton";

const Sidebar = ({ pages }) => {
  return (
    <div id="sidebar" className="sidebar max-w-48 min-w-48 ">
      {pages ? (
        pages
          .filter((page) => page.showInNav)
          .map((page, index) => (
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
