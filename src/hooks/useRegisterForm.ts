import {
  type registerUserFormData,
  registerUserFormScheme,
} from "@/types/registerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface RegisterResponse {
  message: string;
  result: {
    access_token: string;
    id: string;
    email: string;
    createAt: string;
  };
}

export function useRegisterForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerUserFormData>({
    resolver: zodResolver(registerUserFormScheme),
  });

  const mutation = useMutation<RegisterResponse, any, registerUserFormData>({
    mutationFn: async (
      data: registerUserFormData
    ): Promise<RegisterResponse> => {
      const response = await axios.post<RegisterResponse>(
        `http://127.0.0.1:3000/api/register`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: any) => {
      console.error(
        "Erro ao registrar:",
        error.response?.data.message || error.message
      );

      setErrorMessage(error.response?.data.message);
    },
  });

  const registerUser = async (data: registerUserFormData) => {
    mutation.mutate(data);
    reset();
  };

  return {
    register,
    handleSubmit,
    errors,
    registerUser,
    errorMessage,
  };
}
