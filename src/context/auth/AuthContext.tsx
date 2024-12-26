"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import type { IAuthProvider, IContext, IUser } from "../types/contextTypes";
import {
  getUserLocalStorage,
  LoginRequest,
  RegisterRequest,
  setUserLocalStorage,
} from "../utils/utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const payload = await LoginRequest(email, password);

    if (payload) {
      setUser(payload);
      setUserLocalStorage(payload);
      router.push("/");
    } else {
      console.error("Erro na autenticação: Resposta inválida ou ausente");
    }
  }

  async function userRegister({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const response = await RegisterRequest(email, password);

    if (response) {
      router.push("/login");
    }
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, userRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};
