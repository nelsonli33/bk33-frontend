import { authorClient } from "../axios-client";
import { CreatePageRequest, SavePageRequest } from "../models/types";

class AuthorPageApi {
  async getPageById(pageId: number) {
    return await authorClient.get(`/v1/pages/${pageId}`).then((response) => {
      return response.data;
    });
  }

  async createPage(payload: CreatePageRequest) {
    return await authorClient.post(`/v1/pages`, payload).then((response) => {
      return response.data;
    });
  }

  async savePage(pageId: number, payload: SavePageRequest) {
    return await authorClient
      .put(`/v1/pages/${pageId}/save`, payload)
      .then((response) => {
        return response.data;
      });
  }

  async deletePage(pageId: number) {
    return await authorClient.delete(`/v1/pages/${pageId}`).then((response) => {
      return response.data;
    });
  }
}

export default new AuthorPageApi();
