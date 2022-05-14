import { authorClient } from "../axios-client";
import { CreateChapterRequest } from "../models/types";

class AuthorChapterApi {
  async createChapter(bookId: number, payload: CreateChapterRequest) {
    return await authorClient
      .post(`/v1/books/${bookId}/chapters`, payload)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthorChapterApi();
