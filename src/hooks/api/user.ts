import { AxiosError } from "axios";
import { useQueryClient, useMutation, useQuery } from "react-query";
import {
  GetUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  ServerErrorResponse,
} from "../../api/models/types";
import UserApi from "../../api/user-api";

export const userKeys = {
  profile: ["user", "profile"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) => [...todoKeys.details(), id] as const,
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
