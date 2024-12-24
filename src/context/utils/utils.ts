import { Api } from "@/service/useApi";
import type { IUser } from "../types/contextTypes";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("token", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const user = JSON.parse(token);

  return user ?? null;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await Api.post<IUser>(`login`, { email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}
