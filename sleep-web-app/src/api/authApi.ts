import { useMutation } from "react-query";
import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (loginPayload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/api/login`,
    `username=${encodeURIComponent(
      loginPayload.username
    )}&password=${encodeURIComponent(loginPayload.password)}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  return response.data;
};

export const useLogin = () => {
  return useMutation(login);
};
