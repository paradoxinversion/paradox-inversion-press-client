import React from "react";
import SidebarNavButton from "./SidebarNavButton";
const Sidebar = ({ pages }) => {
  console.log(pages);
  return (
    <div id="sidebar" className="sidebar ">
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
