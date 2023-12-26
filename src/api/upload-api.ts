import { AxiosRequestConfig } from "axios";
import { client } from "./axios-client";

class UploadApi {
  async upload(
    file: any,
    progressCallBack?: (progressEvent: ProgressEvent) => void
  ) {
    let formData = new FormData();
    formData.append("file", file);

    return await client
      .post(`/v1/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          progressCallBack && progressCallBack(progressEvent);
        },
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new UploadApi();
