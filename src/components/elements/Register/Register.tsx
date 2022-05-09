import React from "react";
import SignupForm from "./components/SignupForm";

import Divider from "../Divider";
import SocialAuth from "../SocialAuth";
import { useAppDispatch } from "../../../store/hooks";
import { showModal } from "../../../store/modal/slice";

export default function Register() {
  const dispatch = useAppDispatch();

  const goToLoginMarkup = (
    <div className="mt-3">
      <span className="text-sm">
        已經註冊了嗎？
        <button
          onClick={() =>
            dispatch(
              showModal({
                modalType: "LOGIN",
              })
            )
          }
          className="underline ml-2"
        >
          立即登入
        </button>
      </span>
    </div>
  );

  return (
    <>
      <h1 className="flex mb-6 w-full text-2xl">註冊</h1>
      <SocialAuth />
      <Divider text={"或"} />
      <SignupForm />
      {goToLoginMarkup}
    </>
  );
}
