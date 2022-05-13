import { CreateBookRequest, UpdateBookRequest } from "../models/types";
import { authorClient } from "../AxiosClient";

class AuthorBookApi {
  async getBookById(payload: number) {
    return await authorClient.get(`/v1/books/${payload}`).then((response) => {
      return response.data;
    });
  }

  async createBook(payload: CreateBookRequest) {
    return await authorClient.post(`/v1/books`, payload).then((response) => {
      return response.data;
    });
  }

  async updateBookById(bookId: number, payload: UpdateBookRequest) {
    return await authorClient
      .put(`/v1/books/${bookId}`, payload)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthorBookApi();
