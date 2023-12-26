import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { useFileUpload } from "../../../../../../../hooks/api/upload";
import ProgressBar from "../../../../../../elements/ProgressBar";
import Spinner from "../../../../../../elements/Spinner";

export interface CoverUploadProps {
  coverUrl: string;
  onUpdate: (string) => void;
}

const CoverUpload = ({ coverUrl, onUpdate }: CoverUploadProps) => {
  const { percentCompleted, mutate } = useFileUpload();

  const onDrop = useCallback((acceptedFiles) => {
    mutate(acceptedFiles[0], {
      onSuccess: (response) => {
        onUpdate(response.file.url);
      },
    });
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
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
  });

  const isLoading = false;

  const loadingMarkup = (
    <>
      <Spinner size="large" />
      <div className="absolute w-full bottom-3 left-0 px-4">
        <ProgressBar progress={30} />
      </div>
    </>
  );

  const labelMarkup = (
    <label className="block font-medium text-brand-black">內容封面</label>
  );

  const dropzoneClassName = twMerge(
    `relative bg-gray-50 hover:bg-gray-150 hover:border-gray-400 flex flex-col justify-center items-center p-5 cursor-pointer
  min-h-[300px] w-full border-2 border-dashed border-gray-350 outline-none rounded transition-colors aspect-portrait`,
    isDragReject && "bg-red-100 border-red-600",
    isLoading && "bg-gray-300"
  );

  const placeholderClassName = twMerge(
    `relative min-h-[300px] w-full  outline-none rounded transition-colors aspect-portrait`
  );

  const coverMarkup = coverUrl ? (
    <img src={coverUrl} alt="" className="block w-full h-full" />
  ) : null;

  const dropzoneMarkup = (
    <div
      className="DropZoneRoot"
      {...getRootProps({
        className: dropzoneClassName,
      })}
    >
      {isLoading ? (
        loadingMarkup
      ) : (
        <>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>點擊上傳圖像 或 </p>
              <p>拖放圖像即可上傳</p>
            </>
          )}
        </>
      )}
    </div>
  );

  return (
    <>
      {labelMarkup}
      <div className="flex mt-1 w-full">
        <div className="flex-1">
          <div className={placeholderClassName}>
            {coverMarkup ?? dropzoneMarkup}
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
