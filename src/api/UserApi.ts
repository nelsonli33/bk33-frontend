import { client } from "./AxiosClient";
import { UpdateUserProfileRequest } from "./models/types";

class UserApi {
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
