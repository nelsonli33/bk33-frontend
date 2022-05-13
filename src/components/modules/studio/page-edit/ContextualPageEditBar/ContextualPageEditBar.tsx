import React, { useContext, useEffect, useState } from "react";
import { BsLayoutSidebar } from "react-icons/bs";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import Link from "../../../../elements/Link";
import { useSpinDelay } from "spin-delay";
import { PageEditContext } from "../../../../../api/context/page-edit-context";

interface ContextualPageEditBarProps {
  sideBarOpen: boolean;
  toggleSideBar: () => void;
  isSaving: boolean;
  bookId: number;
}

const ContextualPageEditBar = ({
  sideBarOpen,
  toggleSideBar,
  isSaving,
  bookId,
}: ContextualPageEditBarProps) => {
  const { isEditing } = useContext(PageEditContext);

  const saving = useSpinDelay(isSaving, {
    delay: 0,
    minDuration: 500,
  });

  return (
    <div className="block z-50 w-full sticky top-0 bg-[rgba(255,255,255,.97)]">
      <div className="flex items-center">
        {!sideBarOpen && (
          <div className="pl-3">
            <button
              className="py-0 px-2 h-8 leading-8 text-gray-500 hover:text-brand-black hover:bg-gray-150 rounded"
              onClick={toggleSideBar}
            >
              <BsLayoutSidebar className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="mx-12 px-8 h-16 flex items-center relative">
          <div className="flex items-center text-[15px]">
            <Link
              className="py-0 px-2 h-8 leading-8 text-gray-600 hover:text-brand-black hover:bg-gray-150  rounded
           inline-flex items-center space-x-2"
              url={`/studio/contents/${bookId}/detail`}
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>內容</span>
            </Link>

            <div className="text-gray-400 ml-5">
              {isEditing ? <></> : saving || isSaving ? "儲存中..." : "已儲存"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ContextualPageEditBar);
