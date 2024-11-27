import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type registerUserFormData,
  registerUserFormScheme,
} from "@/types/registerForm";

export function useRegisterForm() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerUserFormData>({
    resolver: zodResolver(registerUserFormScheme),
  });

  const registerUser = async (data: registerUserFormData) => {
    setOutput(JSON.stringify(data, null, 2));
  };

  return {
    register,
    handleSubmit,
    errors,
    registerUser,
    output,
  };
}
