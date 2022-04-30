import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "../ProgressBar";

export default function ImageUpload() {
  const [percentCompleted, setPercentCompleted] = useState(0);

  const onUploadProgress = (event) => {
    const percentCompletedRet = Math.round((event.loaded * 100) / event.total);
    console.log(percentCompletedRet);
    setPercentCompleted(percentCompletedRet);
  };

  const handleImageUpload = (event) => {
    // let formData = new FormData();
    // formData.append("file", event.target.files[0]);

    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    axios
      .post(
        "https://api.imgbb.com/1/upload?expiration=600&key=0e024c4743de62b34bcc3d590ac86e95",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress,
        }
      )
      .then((response) => {
        console.log("response", response);
        console.log("response URL", response.data.data.image.url);
        console.log("success");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <input type="file" name="file" onChange={handleImageUpload} />

      <div className="mt-8">
        <div className="relative">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
            alt="..."
            className="shadow rounded max-w-full h-auto align-middle border-none"
          />
          <div className="absolute inset-0 rounded bg-black opacity-50 z-10"></div>
        </div>
        <ProgressBar progress={percentCompleted} />
      </div>
    </>
  );
}
