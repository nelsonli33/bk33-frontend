import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSpinDelay } from "spin-delay";
import AuthApi from "../../api/auth-api";
import { LoginRequest, RegisterUserRequest } from "../../api/models/types";
import { LOADING_DURATION_NORMAL } from "../../global/constants";
import { useAppDispatch } from "../../store/hooks";
import { hideModal } from "../../store/modal/slice";
import { userKeys } from "./user";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError, LoginRequest>(
    (body) => AuthApi.login(body),
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries(userKeys.me).then(() => {
            dispatch(hideModal());
          });
        }, LOADING_DURATION_NORMAL);
      },
    }
  );

  const isSpin = useSpinDelay(mutation.isLoading, {
    delay: 0,
    minDuration: LOADING_DURATION_NORMAL,
  });

  return {
    ...mutation,
    isLoading: isSpin,
  };
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
