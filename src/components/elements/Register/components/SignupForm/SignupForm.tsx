import React from "react";
import { useForm } from "react-hook-form";
import TextField from "../../../TextField";

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
        message: "電子郵件最多 255 個字",
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
          <TextField
            id="name"
            type="text"
            label="使用者名稱"
            error={errors?.name && errors.name.message}
            register={register}
            registerOptions={registerValidation.name}
          />
        </div>
        <div>
          <TextField
            id="email"
            type="email"
            label="電子郵件"
            error={errors?.email && errors.email.message}
            register={register}
            registerOptions={registerValidation.email}
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            label="密碼"
            error={errors?.password && errors.password.message}
            register={register}
            registerOptions={registerValidation.password}
          />
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
