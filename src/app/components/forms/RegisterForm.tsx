import { useRegisterForm } from "@/hooks/useRegisterForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function RegisterForm() {
  const { errors, handleSubmit, register, registerUser } = useRegisterForm();
  return (
    <form
      onSubmit={handleSubmit(registerUser)}
      className="space-y-6"
      action="#"
      method="POST"
    >
      <Input
        label="Email"
        {...register("email")}
        id="email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
      />
      <Input
        label="Senha"
        {...register("password")}
        id="password"
        type="password"
        autoComplete="password"
        error={errors.password?.message}
      />
      <Input
        label="Confirme sua Senha"
        {...register("confirmPassword")}
        id="confirmPassword"
        type="password"
        autoComplete="password"
        error={errors.confirmPassword?.message}
      />
      <div>
        <Button type="submit">Registrar</Button>
      </div>
    </form>
  );
}
