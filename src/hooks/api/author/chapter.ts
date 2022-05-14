import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import authorChapterApi from "../../../api/author/author-chapter-api";
import {
  CreateChapterRequest,
  CreateChapterResponse,
} from "../../../api/models/types";
import { authorBookKeys } from "./book";

export const authorChapterKeys = {
  domain: ["author-api", "chapter"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) =>
  //   [...authorBookKeys.domain, "detail", { book_id: id }] as const,
};

export const useCreateChapter = (bookId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<CreateChapterResponse, AxiosError, CreateChapterRequest>(
    (body) => authorChapterApi.createChapter(bookId, body),
    {
      onSuccess(response) {
        router.push({
          pathname: "/studio/contents/[content_id]/pages/[page_id]",
          query: { content_id: bookId, page_id: response.page.id },
        });
        queryClient.invalidateQueries(authorBookKeys.detail(bookId));
      },
    }
  );
};
