import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import StudioFrame from "../../../../components/modules/studio/home/StudioFrame";
import TextField from "../../../../components/elements/TextField";
import Textarea from "../../../../components/elements/Textarea";
import AvatarUploader from "../../../../components/elements/AvatarUploader";

const profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  return (
    <StudioFrame title="個人檔案">
      <div className="px-4 sm:px-6 md:px-0">
        <h1 className="text-3xl font-extrabold">個人檔案設定</h1>
      </div>
      <div className="px-4 sm:px-6 md:px-0">
        <div className="py-6">
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <TextField
                      label="姓名"
                      id="username"
                      autoComplete="off"
                      register={register}
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <TextField
                      label="頭銜"
                      id="title"
                      autoComplete="off"
                      placeholder={""}
                      register={register}
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <Textarea
                      label="個人簡介"
                      id="short_bio"
                      minRows={5}
                      defaultValue={""}
                    />

                    <p className="mt-2 text-sm text-gray-500">
                      您的個人簡介應有至少 50 個字元。
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <AvatarUploader actionHint="推薦尺寸 1000x1000px, 檔案類型限制: JPG, PNG or GIF." />
                  </div>
                  <div className="sm:col-span-6">
                    <TextField
                      label="個人網站或部落格網址"
                      id="website_url"
                      autoComplete="off"
                      placeholder={""}
                      register={register}
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <TextField
                      label="Facebook"
                      id="facebook_url"
                      autoComplete="off"
                      placeholder={"https://www.facebook.com/username"}
                      register={register}
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <TextField
                      label="Youtube"
                      id="youtube_url"
                      autoComplete="off"
                      placeholder={"https://www.youtube.com/username"}
                      register={register}
                    />
                  </div>
                  <div className="sm:col-span-6">
                    <TextField
                      label="LinkedIn"
                      id="linkedin_url"
                      autoComplete="off"
                      placeholder={"https://www.linkedin.com/username"}
                      register={register}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button type="submit" className="btn-primary">
                  儲存
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </StudioFrame>
  );
};

export default profile;
