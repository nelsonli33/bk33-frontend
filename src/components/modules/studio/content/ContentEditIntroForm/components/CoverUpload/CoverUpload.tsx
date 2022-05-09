import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";
import { classNames } from "../../../../../../../utilities/css";
import { twMerge } from "tailwind-merge";
const CoverUpload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
    },
  });

  const labelMarkup = (
    <label className="block font-medium text-brand-black">內容封面</label>
  );

  return (
    <>
      {labelMarkup}
      <div className="flex mt-1 w-full">
        <div className="flex-1">
          <div
            className="DropZoneRoot"
            {...getRootProps({
              className: twMerge(
                `bg-gray-50 hover:bg-gray-150 hover:border-gray-400 flex flex-col justify-center items-center p-5 cursor-pointer
            min-h-[300px] w-full border-2 border-dashed border-gray-350 outline-none rounded transition-colors aspect-portrait`,
                isDragReject && "bg-red-100 border-red-600"
              ),
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <>
                <p>點擊上傳圖像 或 </p>
                <p>拖放圖像即可上傳</p>
              </>
            )}
          </div>
        </div>
        <div className="w-3/4  flex flex-col justify-start pl-8">
          <p className="font-sans text-gray-600">
            1. 尺寸：900x1125px，不可超過 1080x1350px
          </p>
          <p className="font-sans text-gray-600">
            2. 格式：.jpg、.jpeg、.gif 或 .png 檔案類型。
          </p>
        </div>
      </div>
    </>
  );
};

export default CoverUpload;
