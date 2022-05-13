import { authorClient } from "../axios-client";

class AuthorBookCategoryApi {
  async getCategories() {
    return await authorClient
      .get(`/v1/categories/category-tree`)
      .then((response) => {
        return response.data;
      });
  }
}

export default new AuthorBookCategoryApi();
