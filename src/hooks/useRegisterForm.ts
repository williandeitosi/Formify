import { RegisterUser } from "@/app/service/authService";
import {
  type registerUserFormData,
  registerUserFormScheme,
} from "@/types/registerForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useRegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<registerUserFormData>({
    resolver: zodResolver(registerUserFormScheme),
  });

  const mutation = useMutation({
    mutationFn: RegisterUser,
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error: any) => {
      console.error(
        "Erro ao registrar:",
        error.response?.data.message || error.message
      );
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
  };
}
