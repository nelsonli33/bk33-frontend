import React from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function SocialSignup() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div className="space-y-4">
      <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        render={(renderProps) => (
          <button
            className="inline-flex w-full items-center cursor-pointer
            px-6 py-3 border border-black text-base font-semibold rounded-md
            hover:bg-gray-100"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <div className="flex items-center text-sm w-full">
              <div className="flex-[0_1_0%]">
                <FcGoogle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-[1_1_0%]">使用 Google 帳號註冊</div>
            </div>
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />

      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        fields="name,email,picture"
        callback={responseFacebook}
        language="zh_TW"
        render={(renderProps) => (
          <button
            className="inline-flex w-full items-center cursor-pointer
            px-6 py-3 border border-black text-base font-semibold rounded-md
            hover:bg-gray-100"
            onClick={renderProps.onClick}
            disabled={renderProps.isDisabled}
          >
            <div className="flex items-center text-sm w-full">
              <div className="flex-[0_1_0%]">
                <FaFacebook
                  className="h-5 w-5 fill-[#1778F2]"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-[1_1_0%]">使用 Facebook 帳號註冊</div>
            </div>
          </button>
        )}
      />
    </div>
  );
}
