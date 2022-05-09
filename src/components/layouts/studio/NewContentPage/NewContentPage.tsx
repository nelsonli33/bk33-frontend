import React from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import StudioFrame from "../../../modules/studio/home/StudioFrame";
import NewContentStepTabs from "../../../modules/studio/content/NewContentStepTabs";

const NewContentPage = ({ children, step }) => {
  const router = useRouter();
  return (
    <StudioFrame title="新增內容">
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="sm:flex sm:items-center">
          <button
            type="button"
            className="group border border-gray-300 mr-4 rounded p-1 
        text-gray-400 hover:text-gray-900 hover:bg-gray-150"
            onClick={() => {
              router.push("/studio/contents");
            }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>

          <h1 className="text-3xl font-semibold">新增內容</h1>
        </div>
        <div className="mt-12 flex flex-col">
          <NewContentStepTabs step={step} />
          {children}
        </div>
      </div>
    </StudioFrame>
  );
};

export default NewContentPage;
