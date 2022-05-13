import { AxiosError } from "axios";
import { useMutation } from "react-query";
import AuthApi from "../../api/auth-api";
import { LoginRequest, RegisterUserRequest } from "../../api/models/types";
import { useAppDispatch } from "../../store/hooks";
import { hideModal } from "../../store/modal/slice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, AxiosError, LoginRequest>(
    (body) => AuthApi.login(body),
    {
      onSuccess: () => {
        dispatch(hideModal());
      },
    }
  );
};

export const useRegister = () => {
  const dispatch = useAppDispatch();
  return useMutation<void, AxiosError, RegisterUserRequest>(
    (body) => AuthApi.register(body),
    {
      onSuccess: () => {
        dispatch(hideModal());
      },
    }
  );
};
