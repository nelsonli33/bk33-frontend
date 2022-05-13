import { authorClient } from "../AxiosClient";
import { SavePageRequest } from "../models/types";

class AuthorPageApi {
  async getPageById(bookId: number, pageId: number) {
    return await authorClient
      .get(`/v1/books/${bookId}/pages/${pageId}`)
      .then((response) => {
        return response.data;
      });
  }

  // async createBook(payload: CreateBookRequest) {
  //   return await authorClient.post(`/v1/books`, payload).then((response) => {
  //     return response.data;
  //   });
  // }

  async savePage(bookId: number, pageId: number, payload: SavePageRequest) {
    return await authorClient
      .put(`/v1/books/${bookId}/pages/${pageId}/save`, payload)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthorPageApi();
