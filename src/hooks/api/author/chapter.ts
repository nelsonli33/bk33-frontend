import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { useSpinDelay } from "spin-delay";
import authorChapterApi from "../../../api/author/author-chapter-api";
import {
  CreateChapterRequest,
  CreateChapterResponse,
} from "../../../api/models/types";
import { LOADING_DURATION_NORMAL } from "../../../global/constants";
import { waitFor } from "../../../utilities/wait";
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
  const mutation = useMutation<
    CreateChapterResponse,
    AxiosError,
    CreateChapterRequest
  >((body) => authorChapterApi.createChapter(bookId, body), {
    onSuccess: async () => {
      await waitFor(LOADING_DURATION_NORMAL);
      await queryClient.invalidateQueries(authorBookKeys.detail(bookId));
      // then will fired second onSuccess for router push ref.PageEdit
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

export const useUpdateChapter = (bookId: number, chapterId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<
    CreateChapterResponse,
    AxiosError,
    CreateChapterRequest
  >((body) => authorChapterApi.updateChapter(bookId, chapterId, body), {
    onSuccess() {
      setTimeout(() => {
        queryClient.invalidateQueries(authorBookKeys.detail(bookId));
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

export const useDeleteChapter = (bookId: number, chapterId: number) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, AxiosError, void>(
    () => authorChapterApi.deleteChapter(bookId, chapterId),
    {
      onSuccess() {
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
