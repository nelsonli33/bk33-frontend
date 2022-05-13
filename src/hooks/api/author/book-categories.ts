import { useQuery } from "react-query";
import AuthorBookCategoryApi from "../../../api/author/author-book-category-api";
import {
  GetAuthorBookCategoriesResponse,
  ServerErrorResponse,
} from "../../../api/models/types";

export const authorBookCategoryKeys = {
  all: ["author-api", "book-category"] as const,
  // lists: () => [...todoKeys.all, 'list'] as const,
  // list: (filters: string) => [...todoKeys.lists(), { filters }] as const,
  // details: () => [...todoKeys.all, 'detail'] as const,
  // detail: (id: number) => [...todoKeys.details(), id] as const,
};

export const useGetAuthorBookCategories = () =>
  useQuery<GetAuthorBookCategoriesResponse, ServerErrorResponse>(
    authorBookCategoryKeys.all,
    () => AuthorBookCategoryApi.getCategories()
  );
