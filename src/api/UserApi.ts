import { client } from "./AxiosClient";
import { UpdateUserProfileRequest } from "./models/types";

class UserApi {
  async getUserProfile() {
    return await client.get(`/v1/user/profile`).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  }

  async updateUserProfile(data: UpdateUserProfileRequest) {
    return await client.put(`/v1/user/profile`, data).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  }
}

export default new UserApi();
