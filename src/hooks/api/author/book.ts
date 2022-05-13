import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AuthorBookApi from "../../../api/author/author-book-api";
import {
  CreateBookRequest,
  CreateBookResponse,
  GetBookResponse,
  UpdateBookRequest,
  UpdateBookResponse,
  ServerErrorResponse,
} from "../../../api/models/types";

export const authorBookKeys = {
  domain: ["author-api", "book"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: number) =>
    [...authorBookKeys.domain, "detail", { book_id: id }] as const,
};

export const useGetBook = (bookId: number) =>
  useQuery<GetBookResponse, ServerErrorResponse>(
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
  const router = useRouter();
  return useMutation<UpdateBookResponse, AxiosError, UpdateBookRequest>(
    (body) => AuthorBookApi.updateBookById(bookId, body),

    {
      onSuccess(response) {
        router.push({
          pathname: "/studio/contents/[content_id]/detail",
          query: { content_id: response.book_id },
        });
        queryClient.invalidateQueries(authorBookKeys.detail(response.book_id));
      },
    }
  );
};
