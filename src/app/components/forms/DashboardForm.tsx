import { useHomePageForm } from "@/hooks/useHomePageForm";
import { FaTrash } from "react-icons/fa";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function DashboardForm() {
  const { onSubmit, register, handleSubmit, errors, fields, append, remove } =
    useHomePageForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
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
        {...register("country")}
        error={errors.country?.message}
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
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-center space-x-4"
        >
          <Input
            label="Nome do item"
            type="text"
            {...register(`items.${index}.name`)}
            error={errors.items?.[index]?.name?.message}
          />
          <Input
            label="Preço"
            type="number"
            {...register(`items.${index}.price`)}
            error={errors.items?.[index]?.price?.message}
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 underline mt-6"
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: "", price: 0 })}
        className="self-end text-blue-800 underline"
      >
        Adicionar item +
      </button>
      <Button type="submit">Salvar Perfil</Button>
    </form>
  );
}
