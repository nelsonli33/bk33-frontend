import React from "react";

import LayoutSidebarOpenIcon from "../../../../../../elements/Icon/LayoutSidebarOpenIcon";

interface TitleProps {
  title: string;
  toggleSideBar: () => void;
}

const ContentTitle = ({ title, toggleSideBar }: TitleProps) => {
  return (
    <div className="flex items-center h-16 ">
      <div className="pl-3">
        <button
          className="py-0 px-2 h-8 leading-8 text-gray-500 
      hover:text-brand-black hover:bg-gray-150 rounded"
          onClick={toggleSideBar}
        >
          <LayoutSidebarOpenIcon className="w-5 h-5" />
        </button>
      </div>
      <h3 className="text-xl leading-8 flex-1 pl-3">{title}</h3>
    </div>
  );
};

export default React.memo(ContentTitle);
