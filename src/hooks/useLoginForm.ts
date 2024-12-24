import { type loginUserFormData, loginUserFormScheme } from "@/types/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";

export function useLoginForm() {
  const { authenticate } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormScheme),
  });

  const onSubmit = async (data: loginUserFormData) => {
    try {
      setError(null);
      await authenticate(data.email, data.password);
    } catch (e: any) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
  };
}
