import { client } from "./AxiosClient";
import { LoginRequest, RegisterUserRequest } from "./models/types";

class AuthApi {
  async login(data: LoginRequest) {
    return await client.post(`/v1/user/login`, data).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  }

  async register(data: RegisterUserRequest) {
    return await client.post(`/v1/user/register`, data).then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  }
}

export default new AuthApi();
