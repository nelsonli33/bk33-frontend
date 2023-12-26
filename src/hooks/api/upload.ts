import { AxiosError } from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
import { UploadFileResponse } from "../../api/models/types";
import uploadApi from "../../api/upload-api";

export const useFileUpload = () => {
  const [percentCompleted, setPercentCompleted] = useState(0);

  const onUploadProgress = (event) => {
    const percentCompletedRet = Math.round((event.loaded * 100) / event.total);
    setPercentCompleted(percentCompletedRet);
  };

  const mutation = useMutation<UploadFileResponse, AxiosError, any>((file) =>
    uploadApi.upload(file, onUploadProgress)
  );

  return {
    ...mutation,
    percentCompleted,
  };
};
