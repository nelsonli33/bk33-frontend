import React from "react";
import { useForm } from "react-hook-form";
import Frame from "../../../../components/elements/Frame";
import InlineError from "../../../../components/elements/InlineError";
import Spinner from "../../../../components/elements/Spinner";
import TextField from "../../../../components/elements/TextField";
import Page from "../../../../components/layouts/storefront/Page";
import { ServerErrorResponse } from "../../../../components/types";
import {
  useGetUserProfile,
  useUpdateUserProfile,
} from "../../../../hooks/api/user";

const Profile = () => {
  const { data, isLoading } = useGetUserProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    mutate,
    isLoading: mutateisLoading,
    isError,
    error,
  } = useUpdateUserProfile();

  const onSubmit = (values) => {
    mutate(
      {
        name: values.name,
      },
      { onSuccess: () => reset() }
    );
  };

  const profileForm = data ? (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      {isError && (
        <InlineError
          error={
            error?.response && (error.response?.data as ServerErrorResponse)
          }
        />
      )}
      <div className="space-y-6">
        <TextField
          id="name"
          type="text"
          label="姓名"
          register={register}
          defaultValue={data.user.name}
        />
        <div className="flex flex-col">
          <label htmlFor={"email"} className="block text-gray-700 font-medium">
            電子郵件
          </label>
          <div className="mt-1">{data.user.email}</div>
        </div>
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="btn-primary"
          disabled={mutateisLoading}
        >
          {mutateisLoading ? <Spinner /> : "儲存"}
        </button>
      </div>
    </form>
  ) : null;

  return (
    <Frame title="個人檔案">
      <Page>
        <div className="flex-[0_0_auto] w-64 pr-8">個人檔案</div>
        <div className="flex-[0_0_auto] max-w-screen-md w-full">
          <div className="border-b border-gray-300">
            <h1 className="text-xl font-normal mb-2">我的檔案</h1>
          </div>
          <div className="mt-6">{profileForm}</div>
        </div>
      </Page>
    </Frame>
  );
};

export default Profile;

// <Radio
//           label="性別"
//           name="sex"
//           items={[
//             { id: "1", title: "男" },
//             { id: "2", title: "女" },
//             { id: "9", title: "其他" },
//           ]}
//           register={register}
//         />
