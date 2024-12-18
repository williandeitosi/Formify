import { loginUser } from "@/app/service/authService";
import { type loginUserFormData, loginUserFormScheme } from "@/types/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useLoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormScheme),
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ result: { access_token } }) => {
      if (access_token) {
        localStorage.setItem("access_token", access_token);
        router.push("/");
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
