import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSpinDelay } from "spin-delay";
import AuthorPageApi from "../../../api/author/author-page-api";
import {
  CreatePageRequest,
  CreatePageResponse,
  GetPageResponse,
  SavePageRequest,
  SavePageResponse,
  ServerErrorResponse,
} from "../../../api/models/types";
import {
  LOADING_DURATION_FAST,
  LOADING_DURATION_NORMAL,
} from "../../../global/constants";
import { authorBookKeys } from "./book";

export const authoPageKeys = {
  domain: ["author-api", "page"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  detail: (pageId: number) =>
    [...authoPageKeys.domain, "detail", { page_id: pageId }] as const,
};

export const useGetPage = (pageId: number) => {
  const query = useQuery<GetPageResponse, ServerErrorResponse>(
    authoPageKeys.detail(pageId),
    () => AuthorPageApi.getPageById(pageId),
    {
      staleTime: Infinity,
      enabled: pageId > 0,
    }
  );

  const isSpin = useSpinDelay(query.isLoading, {
    delay: 0,
    minDuration: LOADING_DURATION_FAST,
  });

  return {
    ...query,
    isLoading: isSpin,
  };
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation<
    CreatePageResponse,
    AxiosError,
    CreatePageRequest
  >((body) => AuthorPageApi.createPage(body), {
    onSuccess(response) {
      setTimeout(() => {
        queryClient
          .invalidateQueries(authorBookKeys.detail(response.page.book_id))
          .then(() => {
            router.push({
              pathname: "/studio/contents/[content_id]/pages/[page_id]",
              query: {
                content_id: response.page.book_id,
                page_id: response.page.id,
              },
            });
          });
      }, LOADING_DURATION_NORMAL);
    },
  });

  const isSpin = useSpinDelay(mutation.isLoading, {
    delay: 0,
    minDuration: LOADING_DURATION_NORMAL,
  });

  return {
    ...mutation,
    isLoading: isSpin,
  };
};

export const useSavePage = (pageId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<SavePageResponse, AxiosError, SavePageRequest>(
    (body) => AuthorPageApi.savePage(pageId, body),
    {
      onSuccess: (response) => {
        queryClient.setQueriesData(authoPageKeys.detail(pageId), response);
      },
    }
  );

  const isSpin = useSpinDelay(mutation.isLoading, {
    delay: 0,
    minDuration: 400,
  });

  return {
    ...mutation,
    isLoading: mutation.isLoading || isSpin,
  };
};

export const useDeletePage = (pageId: number, bookId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError, void>(
    () => AuthorPageApi.deletePage(pageId),
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries(authorBookKeys.detail(bookId));
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
