import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSpinDelay } from "spin-delay";
import AuthorBookApi from "../../../api/author/author-book-api";
import {
  CreateBookRequest,
  CreateBookResponse,
  GetBookResponse,
  UpdateBookRequest,
  UpdateBookResponse,
  ServerErrorResponse,
  PaginationParams,
  GetBookListResponse,
} from "../../../api/models/types";
import { LOADING_DURATION_NORMAL } from "../../../global/constants";
import { waitFor } from "../../../utilities/wait";

export const authorBookKeys = {
  domain: ["author-api", "book"] as const,
  lists: () => [...authorBookKeys.domain, "list"] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) =>
    [...authorBookKeys.domain, "detail", { book_id: id }] as const,
};

export const useGetBooks = (page?: number, limit?: number) => {
  let params: PaginationParams;
  if (page || limit) {
    params = {
      page,
      limit,
    };
  }

  return useQuery<GetBookListResponse, AxiosError>(
    authorBookKeys.lists(),
    () => AuthorBookApi.getBooks(params),
    {
      staleTime: Infinity,
    }
  );
};

export const useGetBook = (bookId: number) =>
  useQuery<GetBookResponse, AxiosError>(
    authorBookKeys.detail(bookId),
    () => AuthorBookApi.getBookById(bookId),
    {
      staleTime: Infinity,
      enabled: bookId > 0,
    }
  );

export const useCreateBook = () => {
  const router = useRouter();
  return useMutation<CreateBookResponse, AxiosError, CreateBookRequest>(
    (body) => AuthorBookApi.createBook(body),
    {
      onSuccess(response) {
        router.push({
          pathname: "/studio/contents/[content_id]/detail",
          query: { content_id: response.book_id },
        });
      },
    }
  );
};

export const useUpdateBook = (bookId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    UpdateBookResponse,
    AxiosError,
    UpdateBookRequest
  >((body) => AuthorBookApi.updateBookById(bookId, body), {
    onSuccess: async (response) => {
      await waitFor(LOADING_DURATION_NORMAL);
      await queryClient.invalidateQueries(
        authorBookKeys.detail(response.book_id)
      );
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
