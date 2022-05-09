import React from "react";
import { APP_NAME } from "../../../global/constants";
import { useAppDispatch } from "../../../store/hooks";
import { showModal } from "../../../store/modal/slice";

import Divider from "../Divider";
import SocialAuth from "../SocialAuth";
import LoginForm from "./components/LoginForm";
export default function Login() {
  const dispatch = useAppDispatch();

  const goToRegisterMarkup = (
    <div className="mt-3">
      <span className="text-sm">
        {APP_NAME} 新朋友？
        <button
          onClick={() =>
            dispatch(
              showModal({
                modalType: "REGISTER",
              })
            )
          }
          className="underline ml-2"
        >
          立即註冊
        </button>
      </span>
    </div>
  );

  return (
    <>
      <h1 className="flex mb-6 w-full text-2xl">登入</h1>
      <SocialAuth />
      <Divider text={"或"} />
      <LoginForm />
      {goToRegisterMarkup}
    </>
  );
}
