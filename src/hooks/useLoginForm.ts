import { type loginUserFormData, loginUserFormScheme } from "@/types/loginForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function useLoginForm() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginUserFormData>({
    resolver: zodResolver(loginUserFormScheme),
  });

  const loginUser = (data: loginUserFormData) => {
    setOutput(JSON.stringify(data, null, 2));
  };

  return {
    output,
    register,
    handleSubmit,
    errors,
    loginUser,
  };
}
