import { client } from "./axios-client";
import { UpdateUserProfileRequest } from "./models/types";

class UserApi {
  async getUserMe() {
    return await client.get(`/v1/user/me`).then((response) => {
      return response.data;
    });
  }

  async getUserProfile() {
    return await client.get(`/v1/user/profile`).then((response) => {
      return response.data;
    });
  }

  async updateUserProfile(payload: UpdateUserProfileRequest) {
    return await client.put(`/v1/user/profile`, payload).then((response) => {
      return response.data;
    });
  }
}

export default new UserApi();
