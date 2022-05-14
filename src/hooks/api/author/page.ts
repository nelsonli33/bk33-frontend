import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AuthorPageApi from "../../../api/author/author-page-api";
import {
  GetPageResponse,
  SavePageRequest,
  SavePageResponse,
  ServerErrorResponse,
} from "../../../api/models/types";

export const authoPageKeys = {
  domain: ["author-api", "page"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  detail: (pageId: number) =>
    [...authoPageKeys.domain, "detail", { page_id: pageId }] as const,
};

export const useGetPage = (pageId: number) =>
  useQuery<GetPageResponse, ServerErrorResponse>(
    authoPageKeys.detail(pageId),
    () => AuthorPageApi.getPageById(pageId),
    {
      staleTime: Infinity,
      enabled: pageId > 0,
    }
  );

export const useSavePage = (pageId: number) => {
  const queryClient = useQueryClient();
  return useMutation<SavePageResponse, AxiosError, SavePageRequest>(
    (body) => AuthorPageApi.savePage(pageId, body),
    {
      onSuccess: (response) => {
        queryClient.setQueriesData(authoPageKeys.detail(pageId), response);
      },
    }
  );
};
