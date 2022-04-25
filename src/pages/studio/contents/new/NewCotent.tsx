import React from "react";
import { useRouter } from "next/router";
import StudioFrame from "../../../../components/modules/studio/home/StudioFrame";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import NewContentForm from "../../../../components/modules/studio/content/NewContentForm/NewContentForm";
export default function NewBook() {
  const router = useRouter();
  return (
    <StudioFrame title="新增內容">
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="sm:flex sm:items-center">
          <button
            type="button"
            className="group border border-gray-300 mr-4 rounded p-1 text-gray-400 hover:text-gray-900"
            onClick={() => {
              router.push("/studio/contents");
            }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>

          <h1 className="text-3xl font-semibold">新增內容</h1>
        </div>
        <div className="mt-12 flex flex-col">
          <NewContentForm />
        </div>
      </div>
    </StudioFrame>
  );
}
