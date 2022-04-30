import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import { classNames } from "../../../../../utilities/css";
import { Transition } from "@headlessui/react";
import TiptapEditor from "../../../../../components/elements/TiptapEditor";
import ContextualPageEditBar from "../../../../../components/modules/studio/page-edit/ContextualPageEditBar";
import PageEditCatalog from "../../../../../components/modules/studio/page-edit/PageEditCatalog";
import { useToggle } from "../../../../../hooks/useToggle";

export default function Page() {
  const { open, toggle } = useToggle(true);

  const pageTitleMarkup = (
    <>
      <label htmlFor="title" className="sr-only">
        標題
      </label>
      <TextareaAutosize
        name="title"
        id="title"
        className="block w-full border-0 px-0 py-2  resize-none placeholder-gray-500 focus:ring-0 text-[41px] leading-tight"
        placeholder="標題"
        maxLength={50}
        defaultValue={""}
        value={"人有兩段人生，你開始你的第二段人生了嗎？"}
      />
    </>
  );

  const pageDescMarkup = (
    <>
      <label htmlFor="description" className="sr-only">
        頁面描述(選填)
      </label>
      <TextareaAutosize
        name="description"
        id="description"
        className="block w-full border-0 p-0 resize-none placeholder-gray-500 focus:ring-0 text-gray-900 font-normal leading-7 font-serif"
        placeholder="頁面描述(選填)"
        maxLength={150}
        defaultValue={""}
        value={
          "踏上一部「欲望跑步機」，必須一直往前跑才會有新的快樂，但也永遠沒有心滿意足的時候。真正的贏家或許是能夠完全退出遊戲的人，他們不再投入遊戲，甚至超越了遊戲。"
        }
      />
    </>
  );

  return (
    <div>
      <div
        className={classNames(
          "hidden  md:fixed md:inset-y-0 md:w-72",
          open ? "md:flex md:flex-col" : "md:hidden"
        )}
      >
        <div
          className={classNames(
            "flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white"
          )}
        >
          <PageEditCatalog toggleSideBar={toggle} />
        </div>
      </div>

      <div
        className={classNames(" flex flex-col flex-1", open ? "pl-72" : "pl-0")}
      >
        <ContextualPageEditBar sideBarOpen={open} toggleSideBar={toggle} />
        <main className="max-w-3xl mx-auto px-4 py-6 sm:px-6 md:px-12 w-full">
          <div>
            {pageTitleMarkup}
            {pageDescMarkup}
          </div>
          <div className="my-8">
            <TiptapEditor />
          </div>
        </main>
      </div>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }

        body {
          background-color: #ffffff;
        }
      `}</style>
    </div>
  );
}
