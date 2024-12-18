import axios from "axios";

interface LoginResponse {
  result: {
    access_token: string;
  };
}

interface RegisterResponse {
  message: string;
  result: {
    access_token: string;
    id: string;
    email: string;
    createAt: string;
  };
}

export const loginUser = async (data: any): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `http://127.0.0.1:3000/api/login`,
    data
  );
  return response.data;
};

export const RegisterUser = async (data: any): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>(
    `http://127.0.0.1:3000/api/register`,
    data
  );
  return response.data;
};
