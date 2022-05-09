import React from "react";
import axios from "axios";
import Avatar from "../Avatar";
import Upload from "rc-upload";

export interface AvatarUploaderProps {
  actionHint?: string;
}

const AvatarUploader = ({ actionHint }: AvatarUploaderProps) => {
  const uploadProps = {
    action: "/upload.do",
    multiple: false,

    onStart(file) {
      console.log("onStart", file, file.name);
    },
    onSuccess(res, file) {
      console.log("onSuccess", res, file.name);
    },
    onError(err) {
      console.log("onError", err);
    },
    onProgress({ percent }, file) {
      console.log("onProgress", `${percent}%`, file.name);
    },
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      // EXAMPLE: post form-data with 'axios'
      // eslint-disable-next-line no-undef
      const formData = new FormData();
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      formData.append(filename, file);

      axios
        .post(action, formData, {
          withCredentials,
          headers,
          onUploadProgress: ({ total, loaded }) => {
            onProgress(
              { percent: Math.round((loaded / total) * 100).toFixed(2) },
              file
            );
          },
        })
        .then(({ data: response }) => {
          onSuccess(response, file);
        })
        .catch(onError);
    },
  };

  return (
    <>
      <label htmlFor="photo" className="block font-medium text-gray-700">
        頭像
      </label>
      <div className="mt-2">
        <div className="flex items-center">
          <Avatar />
          <Upload accept="image/*" className="ml-5 btn-tertiary">
            選擇圖片
          </Upload>
        </div>
        {actionHint && (
          <p className="mt-2 text-sm text-gray-500">{actionHint}</p>
        )}
      </div>
    </>
  );
};

export default AvatarUploader;
