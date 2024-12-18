import { useLoginForm } from "@/hooks/useLoginForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function LoginForm() {
  const { errors, handleSubmit, register } = useLoginForm();
  return (
    <form
      onSubmit={handleSubmit}
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
      <div>
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
}
