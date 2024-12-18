import { z } from "zod";

export const registerUserFormScheme = z
  .object({
    email: z
      .string()
      .min(1, "E-maill é obrigatório")
      .email("Formato de E-mail invalido")
      .toLowerCase(),
    password: z.coerce.string().min(6, "minimo 6 caracteres"),
    confirmPassword: z.coerce.string().min(6, "minimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas estão diferentes",
  });

export type registerUserFormData = z.infer<typeof registerUserFormScheme>;
