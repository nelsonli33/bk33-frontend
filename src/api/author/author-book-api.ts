import {
  CreateBookRequest,
  PaginationParams,
  UpdateBookRequest,
} from "../models/types";
import { authorClient, serializeQuery } from "../axios-client";

class AuthorBookApi {
  async getBooks(params: PaginationParams) {
    return await authorClient
      .get(`/v1/books${serializeQuery(params)}`)
      .then((response) => {
        return response.data;
      });
  }

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

  async publishBookById(bookId: number) {
    return await authorClient
      .put(`/v1/books/${bookId}/publish`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthorBookApi();
