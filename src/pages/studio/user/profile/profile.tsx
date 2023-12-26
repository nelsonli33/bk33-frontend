import React from "react";

import StudioFrame from "../../../../components/modules/studio/home/StudioFrame";

import StudioPage from "../../../../components/layouts/studio/StudioPage";
import UserProfileForm from "../../../../components/modules/studio/user/profile/UserProfileForm";
import { useGetUserProfile } from "../../../../hooks/api/user";

const profile = () => {
  const { data, isLoading } = useGetUserProfile();

  console.log(data);

  console.log(isLoading);

  return (
    <StudioFrame title="個人檔案">
      <StudioPage title="個人檔案設定">
        <div className="px-4 sm:px-6 md:px-0">
          <div className="py-6">
            {!isLoading && data && <UserProfileForm user={data.user} />}
          </div>
        </div>
      </StudioPage>
    </StudioFrame>
  );
};

export default profile;
