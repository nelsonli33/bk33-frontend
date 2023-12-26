import React from "react";
import { useForm } from "react-hook-form";
import { User } from "../../../../../../api/models/types";
import { useGetUserProfile } from "../../../../../../hooks/api/user";
import AvatarUploader from "../../../../../elements/AvatarUploader";
import Textarea from "../../../../../elements/Textarea";
import TextField from "../../../../../elements/TextField";

export interface UserProfileFormProps {
  user: User;
}

const UserProfileForm = ({ user }: UserProfileFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: user.id,
      name: user.name,
      title: user.title,
      uid: user.uid,
      email: user.email,
      avatar: user.avatar,
      short_bio: user.short_bio,
      birthday: user.birthday,
      linkedin_url: user.linkedin_url,
      facebook_url: user.facebook_url,
      website_url: user.website_url,
      youtube_url: user.youtube_url,
    },
    mode: "onTouched",
  });

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mt-5 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <TextField
                label="姓名"
                id="name"
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
  );
};

export default UserProfileForm;
