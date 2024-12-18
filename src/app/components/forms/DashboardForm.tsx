import { useHomePageForm } from "@/hooks/useHomePageForm";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function DashboardForm() {
  const { onSubmit, register, handleSubmit, errors } = useHomePageForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Nome"
        type="text"
        id="name"
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="CPF"
        type="text"
        id="cpf"
        {...register("cpf")}
        error={errors.cpf?.message}
      />

      <Input
        label="País"
        type="text"
        id="country"
        {...register("coountry")}
        error={errors.coountry?.message}
      />

      <div>
        <label
          htmlFor="avatar"
          className="block text-sm font-medium text-gray-700"
        >
          Avatar
        </label>
        <input
          type="file"
          id="avatar"
          {...register("avatar")}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {errors.avatar && (
          <span className="text-xs text-red-800">
            {String(errors.avatar?.message)}
          </span>
        )}
      </div>
      <Button type="submit">Salvar Perfil</Button>
    </form>
  );
}
