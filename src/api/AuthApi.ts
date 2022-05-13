import { client } from "./AxiosClient";
import { LoginRequest, RegisterUserRequest } from "./models/types";

class AuthApi {
  async login(payload: LoginRequest) {
    return await client.post(`/v1/user/login`, payload).then((response) => {
      return response.data;
    });
  }

  async register(payload: RegisterUserRequest) {
    return await client.post(`/v1/user/register`, payload).then((response) => {
      return response.data;
    });
  }
}

export default new AuthApi();
