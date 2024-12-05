import {
  type registerUserFormData,
  registerUserFormScheme,
} from "@/types/registerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
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
    //TODO: tentar usar as variaveis de ambiente no local da url
    onSuccess: (data: RegisterResponse) => {
      console.log(`Register is successful!`);
      if (data.result.access_token) {
        localStorage.setItem("access_token", data.result.access_token);
      } else {
        console.log("NAO ENCONTREI O TOKEN");
      }
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
