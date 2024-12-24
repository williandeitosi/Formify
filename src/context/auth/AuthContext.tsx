"use client";

import { createContext, useEffect, useState } from "react";
import type { IAuthProvider, IContext, IUser } from "../types/contextTypes";
import {
  getUserLocalStorage,
  LoginRequest,
  setUserLocalStorage,
} from "../utils/utils";

export const AuthContext = createContext<IContext>({} as IContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await LoginRequest(email, password);

    const payload = {
      token: response?.token,
      email: response?.email,
    };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  async function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
