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
  detail: (bookId: number, pageId: number) =>
    [
      ...authoPageKeys.domain,
      "detail",
      { book_id: bookId, page_id: pageId },
    ] as const,
};

export const useGetPage = (bookId: number, pageId: number) =>
  useQuery<GetPageResponse, ServerErrorResponse>(
    authoPageKeys.detail(bookId, pageId),
    () => AuthorPageApi.getPageById(bookId, pageId),
    {
      staleTime: Infinity,
      enabled: bookId > 0 && pageId > 0,
    }
  );

export const useSavePage = (bookId: number, pageId: number) => {
  const queryClient = useQueryClient();
  return useMutation<SavePageResponse, AxiosError, SavePageRequest>(
    (body) => AuthorPageApi.savePage(bookId, pageId, body),
    {
      onSuccess: (response) => {
        queryClient.setQueriesData(
          authoPageKeys.detail(bookId, pageId),
          response
        );
      },
    }
  );
};
