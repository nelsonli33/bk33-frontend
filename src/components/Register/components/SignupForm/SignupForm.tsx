import React from "react";
import { useForm } from "react-hook-form";
import { classNames } from "../../../../utilities/css";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => console.log(data);

  const registerValidation = {
    name: {
      required: "使用者名稱為必填",
      maxLength: {
        value: 100,
        message: "使用者名稱最多 100 個字",
      },
    },
    email: {
      required: "電子郵件為必填",
      maxLength: {
        value: 255,
        message: "使用者名稱最多 255 個字",
      },
    },
    password: {
      required: "密碼為必填",
      pattern: {
        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        message: "密碼須至少 6 位字且包含英文字母及數字",
      },
    },
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="space-y-4">
        <div>
          <div
            className={classNames(
              errors?.name
                ? "border-red-500 focus-within:ring-red-600 focus-within:border-red-600"
                : "border-gray-300 focus-within:ring-slate-800 focus-within:border-slate-800",
              "relative border  px-4 rounded-lg focus-within:ring-1"
            )}
          >
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              className="peer block w-full border-0 p-0 text-gray-900 placeholder-transparent focus:ring-0 h-[46px] leading-[46px] pt-4 form-input"
              placeholder="使用者名稱"
              {...register("name", registerValidation.name)}
            />
            <label
              htmlFor="name"
              className={classNames(
                errors?.name ? "text-red-600" : "text-gray-400",
                `peer-placeholder-shown:sm:text-base
                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:-translate-y-1/2
                    peer-focus:top-1.5
                    peer-focus:translate-y-0
                    peer-focus:sm:text-xs
                    transition-all
                    block cursor-text sm:text-xs absolute px-4 left-0 top-1.5 translate-y-0`
              )}
            >
              使用者名稱
            </label>
          </div>
          {errors?.name && (
            <small className="inline-block mt-1 text-red-600">
              {errors.name.message}
            </small>
          )}
        </div>

        <div>
          <div
            className={classNames(
              errors?.email
                ? "border-red-500 focus-within:ring-red-600 focus-within:border-red-600"
                : "border-gray-300 focus-within:ring-slate-800 focus-within:border-slate-800",
              "relative border  px-4 rounded-lg focus-within:ring-1"
            )}
          >
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full border-0 p-0 text-gray-900 placeholder-transparent
  focus:ring-0 peer h-[46px] leading-[46px] pt-4 form-input"
              placeholder="電子郵件"
              autoComplete="off"
              {...register("email", registerValidation.email)}
            />
            <label
              htmlFor="email"
              className={classNames(
                errors?.email ? "text-red-600" : "text-gray-400",
                `peer-placeholder-shown:sm:text-base
                  peer-placeholder-shown:top-1/2
                  peer-placeholder-shown:-translate-y-1/2
                  peer-focus:top-1.5
                  peer-focus:translate-y-0
                  peer-focus:sm:text-xs
                  transition-all
                  block cursor-text sm:text-xs absolute px-4 left-0 top-1.5 translate-y-0`
              )}
            >
              電子郵件
            </label>
          </div>
          {errors?.email && (
            <small className="inline-block mt-1 text-red-600">
              {errors.email.message}
            </small>
          )}
        </div>
        <div>
          <div
            className={classNames(
              errors?.password
                ? "border-red-500 focus-within:ring-red-600 focus-within:border-red-600"
                : "border-gray-300 focus-within:ring-slate-800 focus-within:border-slate-800",
              "relative border  px-4 rounded-lg focus-within:ring-1"
            )}
          >
            <input
              id="password"
              name="password"
              type="password"
              className="block w-full border-0 p-0 text-gray-900 placeholder-transparent
  focus:ring-0 peer h-[46px] leading-[46px] pt-4 form-input"
              placeholder="密碼"
              autoComplete="off"
              {...register("password", registerValidation.password)}
            />
            <label
              htmlFor="password"
              className={classNames(
                errors?.password ? "text-red-600" : "text-gray-400",
                `peer-placeholder-shown:sm:text-base
                  peer-placeholder-shown:top-1/2
                  peer-placeholder-shown:-translate-y-1/2
                  peer-focus:top-1.5
                  peer-focus:translate-y-0
                  peer-focus:sm:text-xs
                  transition-all
                  block cursor-text sm:text-xs absolute px-4 left-0 top-1.5 translate-y-0`
              )}
            >
              密碼
            </label>
          </div>
          {errors?.password && (
            <small className="inline-block mt-1 text-red-600">
              {errors.password.message}
            </small>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center px-6 py-3 border 
        border-transparent rounded-md shadow-sm text-sm font-medium text-white 
        bg-slate-900 hover:bg-slate-700 "
          >
            註冊
          </button>
        </div>
      </div>
    </form>
  );
}
