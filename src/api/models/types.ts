/**
 * global
 */
export type ServerErrorResponse = {
  error: {
    code: string;
    message?: string;
    errors?: {
      field?: string;
      message?: string;
    }[];
  };
};

export type PaginationParams = {
  page?: number;
  limit?: number;
};

/**
 * Storefront related api
 */
export type LoginRequest = {
  uid: string;
  password: string;
};

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  title: string;
  uid: string;
  email: string;
  avatar: string;
  short_bio: string;
  birthday: string | null;
  linkedin_url: string;
  facebook_url: string;
  website_url: string;
  youtube_url: string;
};

export type UserBasic = {
  name: string;
  uid: string;
  email: string;
  avatar: string;
};

export type GetUserMeResponse = {
  user: UserBasic;
};

export type GetUserProfileResponse = {
  user: User;
};

export type UpdateUserProfileRequest = {
  name: string;
};

export type UpdateUserProfileResponse = {
  user: User;
};

/**
 * Author related api
 */
export type CategoryTreeData = {
  id: number;
  name: string;
  parent_id: number;
  children: CategoryTreeData[];
};
export type CategoryData = {
  id: number;
  name: string;
  parent_id: number;
};

export type TableOfContent = {
  chapters: Chapter[];
};

export type Chapter = {
  id: number;
  book_id: number;
  title: string;
  pages: Page[];
};

export type Page = {
  id: number;
  title: string;
  description: string;
  body: JSON;
  character_count: number;
  sort_position: number;
  book_id: number;
  chapter_id: number;
  author_id: number;
};

export type Book = {
  id: number;
  user_id: number;
  title: string;
  subtitle: string;
  priceType: number;
  price: number;
  synopsis: string;
  acquisition: string[];
  cover: string;
  categories: CategoryData[];
  toc: TableOfContent;
  published_at: string;
  status: number;
  character_count: number;
  created_at: string;
  updated_at: string;
};

export type File = {
  id: number;
  filename: string;
  extension: string;
  url: string;
  size: number;
  original_filename: string;
  mime_type: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBookRequest = {
  title: string;
  category_ids: number[];
};

export type CreateBookResponse = {
  book_id: number;
};

export type GetBookResponse = {
  book: Book;
};

export type GetBookListResponse = {
  books: Book[];
};

export type GetAuthorBookCategoriesResponse = {
  categories: CategoryTreeData[];
};

export type UpdateBookRequest = {
  title: string;
  subtitle: string;
  category_ids?: number[];
  price?: number;
  synopsis?: string;
  acquisition?: string;
  cover?: string;
};

export type UpdateBookResponse = {
  book_id: number;
};

export type CreateChapterRequest = {
  title: string;
  before_chapter_id?: number;
  after_chapter_id?: number;
};

export type CreateChapterResponse = {
  chapter: Chapter;
  page: Page;
};

export type UpdateChapterRequest = {
  title: string;
};

export type UpdateChapterResponse = {
  chapter: Chapter;
};

export type CreatePageRequest = {
  book_id: number;
  chapter_id: number;
  title: string;
  before_page_id?: number;
  after_page_id?: number;
};

export type CreatePageResponse = {
  page: Page;
};

export type GetPageResponse = {
  page: Page;
};

export type SavePageRequest = {
  title?: string;
  description?: string;
  body?: string;
  character_count?: number;
};

export type SavePageResponse = {
  page: Page;
};

export type UploadFileResponse = {
  file: File;
};
