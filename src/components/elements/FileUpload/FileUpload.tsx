import React from "react";
import { DownloadIcon } from "@heroicons/react/outline";
import ProgressBar from "../ProgressBar";

export default function FileUpload() {
  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <>
      <input type="file" name="file" onChange={handleFileUpload} />

      <div className="mt-8">
        <div className="border border-gray-200 shadow-xs rounded">
          <div className="my-4 px-6">
            <div className="flex items-center justify-between">
              <div>test</div>
              <div>
                <button className="">
                  <DownloadIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <ProgressBar progress={50} />
          </div>
        </div>
      </div>
    </>
  );
}
