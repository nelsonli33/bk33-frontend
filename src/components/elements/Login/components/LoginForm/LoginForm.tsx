import React from "react";
import { useForm } from "react-hook-form";
import {
  LoginRequest,
  ServerErrorResponse,
} from "../../../../../api/models/types";
import TextField from "../../../TextField";
import { useLogin } from "../../../../../hooks/api/auth";
import InlineError from "../../../InlineError";

import Spinner from "../../../Spinner/Spinner";

type FormData = LoginRequest & {};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const { isLoading, isError, error, mutate } = useLogin();

  const onSubmit = (formData: FormData) => {
    mutate({
      ...formData,
    });
  };

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
        {isError && (
          <InlineError
            error={
              error?.response && (error.response?.data as ServerErrorResponse)
            }
          />
        )}
        <div>
          <TextField
            id="uid"
            type="text"
            label="電子郵件"
            labelType="floating-label"
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
            labelType="floating-label"
            error={errors?.password && errors.password.message}
            register={register}
            registerOptions={loginValidation.password}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full btn-primary px-6 py-3"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "登入"}
          </button>
        </div>
      </div>
    </form>
  );
}
