import { authorClient } from "../axios-client";
import { CreateChapterRequest, UpdateChapterRequest } from "../models/types";

class AuthorChapterApi {
  async createChapter(bookId: number, payload: CreateChapterRequest) {
    return await authorClient
      .post(`/v1/books/${bookId}/chapters`, payload)
      .then((response) => {
        return response.data;
      });
  }

  async updateChapter(
    bookId: number,
    chapterId: number,
    payload: UpdateChapterRequest
  ) {
    return await authorClient
      .put(`/v1/books/${bookId}/chapters/${chapterId}`, payload)
      .then((response) => {
        return response.data;
      });
  }

  async deleteChapter(bookId: number, chapterId: number) {
    return await authorClient
      .delete(`/v1/books/${bookId}/chapters/${chapterId}`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthorChapterApi();
