import { z } from "zod";
export const loginUserFormScheme = z.object({
  email: z
    .string()
    .min(1, "E-maill é obrigatório")
    .email("Formato de E-mail invalido")
    .toLowerCase(),
  password: z.string().min(6, "minimo 6 caracteres"),
});

export type loginUserFormData = z.infer<typeof loginUserFormScheme>;
