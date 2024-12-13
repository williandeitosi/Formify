"use client";

import { type loginUserFormData, loginUserFormScheme } from "@/types/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginResponse {
  result: {
    access_token: string;
  };
}

export function useLoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormScheme),
  });

  const loginUser = async (data: loginUserFormData): Promise<LoginResponse> => {
    const response = await axios.post<LoginResponse>(
      `http://127.0.0.1:3000/api/login`,
      data
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ result: { access_token } }) => {
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        router.push("/");
      } else {
        console.log(`usuario nao autorizado`);
      }
    },
    onError: (error: any) => {
      console.error(
        "Erro ao fazer login:",
        error.response?.data?.message || error.message
      );
    },
  });

  return {
    register,
    handleSubmit: handleSubmit((data) => mutation.mutate(data)),
    errors,
  };
}
