import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
import {
  GetUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from "../../api/models/types";
import UserApi from "../../api/UserApi";
import { ServerErrorResponse } from "../../components/types";

export enum ServerStateKeys {
  UserProfile = "user-profile",
}

export const useGetUserProfile = () =>
  useQuery<GetUserProfileResponse, ServerErrorResponse>(
    ServerStateKeys.UserProfile,
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
    onSuccess: () => queryClient.invalidateQueries(ServerStateKeys.UserProfile),
  });
};
