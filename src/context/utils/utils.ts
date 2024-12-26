import { Api } from "@/service/useApi";
import type { ApiResponse, IUser } from "../types/contextTypes";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("token", JSON.stringify(user?.token));
  localStorage.setItem("user", JSON.stringify(user?.email));
}

export function getUserLocalStorage() {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("user");

  if (!token || !email) {
    return null;
  }

  return { token, email };
}

export async function LoginRequest(
  email: string,
  password: string
): Promise<IUser | null> {
  try {
    const request = await Api.post<ApiResponse>(`login`, { email, password });
    const { access_token, email: userEmail } = request.data.result;
    return {
      token: access_token,
      email: userEmail,
    };
  } catch (error) {
    return null;
  }
}

export async function RegisterRequest(
  email: string,
  password: string
): Promise<IUser | null> {
  try {
    const request = await Api.post<ApiResponse>(`register`, {
      email,
      password,
    });
    const { access_token, email: userEmail } = request.data.result;

    return {
      token: access_token,
      email: userEmail,
    };
  } catch (error) {
    return null;
  }
}
