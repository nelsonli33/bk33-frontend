import React from "react";
import { useGetUserMe } from "../../../../../hooks/api/user";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { showModal } from "../../../../../store/modal/slice";
import Button from "../../../Button";
import { MODAL_TYPES } from "../../../Modal/ModalRoot";
import UserProfileMenu from "../UserProfileMenu";

const Auth = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const { data, isLoading } = useGetUserMe();

  if (isLoading) {
    return null;
  }

  const authMarkup = (
    <div className="flex items-center space-x-4">
      <button
        className="btn-secondary px-5 py-2 text-sm"
        onClick={() =>
          dispatch(
            showModal({
              modalType: MODAL_TYPES.login,
            })
          )
        }
      >
        登入
      </button>
      <button
        className="btn-primary px-5 py-2 text-sm"
        onClick={() =>
          dispatch(
            showModal({
              modalType: MODAL_TYPES.register,
            })
          )
        }
      >
        註冊
      </button>
    </div>
  );

  return isLoggedIn && data ? <UserProfileMenu user={data.user} /> : authMarkup;
};

export default Auth;
