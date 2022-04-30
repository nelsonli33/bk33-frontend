import React from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { ArrowLeftIcon } from "@heroicons/react/outline";

interface ContextualPageEditBarProps {
  sideBarOpen: boolean;
  toggleSideBar: () => void;
}

export default function ContextualPageEditBar({
  sideBarOpen,
  toggleSideBar,
}: ContextualPageEditBarProps) {
  return (
    <div className="flex flex-0 items-center h-8 my-7 mx-3 sticky top-7">
      <div>
        {!sideBarOpen && (
          <button
            className="py-0 px-2 h-8 leading-8 text-gray-500 hover:text-brand-black hover:bg-gray-150 rounded"
            onClick={toggleSideBar}
          >
            <BsLayoutSidebar className="w-5 h-5" />
          </button>
        )}
      </div>
      <div className="flex flex-1 items-center ml-15 text-[15px]">
        <button
          type="button"
          className="py-0 px-2 h-8 leading-8 text-gray-600 hover:text-brand-black hover:bg-gray-150  rounded
           inline-flex items-center space-x-2"
          onClick={() => {}}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>內容</span>
        </button>

        <div className="text-gray-400 ml-5">已儲存</div>
      </div>
    </div>
  );
}
