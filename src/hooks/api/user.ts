import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
import {
  GetUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  ServerErrorResponse,
  GetUserMeResponse,
} from "../../api/models/types";
import UserApi from "../../api/user-api";
import { loginSuccess, logout } from "../../store/auth/slice";
import { useAppDispatch } from "../../store/hooks";

export const userKeys = {
  me: ["user", "me"] as const,
  profile: ["user", "profile"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) => [...todoKeys.details(), id] as const,
};

export const useGetUserMe = () => {
  const dispatch = useAppDispatch();

  return useQuery<GetUserMeResponse, AxiosError>(
    userKeys.me,
    () => UserApi.getUserMe(),
    {
      staleTime: Infinity,
      onSuccess: () => {
        dispatch(loginSuccess());
      },
      onError: (error) => {
        if (error && error.response?.status === 401) {
          dispatch(logout());
        }
      },
    }
  );
};

export const useGetUserProfile = () =>
  useQuery<GetUserProfileResponse, ServerErrorResponse>(
    userKeys.profile,
    () => UserApi.getUserProfile(),
    {
      staleTime: Infinity,
    }
  );

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUserProfileResponse,
    AxiosError,
    UpdateUserProfileRequest
  >((body) => UserApi.updateUserProfile(body), {
    onSuccess: () => queryClient.invalidateQueries(userKeys.profile),
  });
};
