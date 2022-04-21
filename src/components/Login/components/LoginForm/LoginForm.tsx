import React from "react";
import { useForm } from "react-hook-form";
import TextField from "../../../TextField";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => console.log(data);

  const loginValidation = {
    uid: {
      required: "電子郵件為必填",
      maxLength: {
        value: 255,
        message: "電子郵件最多 255 個字",
      },
    },
    password: {
      required: "密碼為必填",
    },
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="space-y-4">
        <div>
          <TextField
            id="uid"
            type="text"
            label="電子郵件"
            error={errors?.uid && errors.uid.message}
            register={register}
            registerOptions={loginValidation.uid}
          />
        </div>

        <div>
          <TextField
            id="password"
            type="password"
            label="密碼"
            error={errors?.password && errors.password.message}
            register={register}
            registerOptions={loginValidation.password}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center px-6 py-3 border 
          border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          bg-slate-900 hover:bg-slate-700 "
          >
            登入
          </button>
        </div>
      </div>
    </form>
  );
}
