import { usePeople } from "@/context/People/PeopleContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export interface Person {
  id: number;
  name: string;
  cpf: string;
  country: string;
  avatar: string;
  items: Item[];
}

export interface Item {
  name: string;
  price: number;
}

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  cpf: z.string().min(11, "O CPF deve ter 11 dígitos numéricos.").max(11),
  country: z.string().min(3, "O país deve ter pelo menos 3 caracteres."),
  avatar: z
    .any()
    .refine((file: FileList) => file?.length > 0, "O avatar é obrigatório."),
  items: z.array(
    z.object({
      name: z
        .string()
        .min(2, "O nome do item deve ter pelo menos 2 caracteres."),
      price: z.coerce.number().positive("O preço deve ser maior que zero."),
    })
  ),
});

type FormInputs = z.infer<typeof formSchema>;

export const useHomePageForm = () => {
  const { addPerson } = usePeople();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });

  const onSubmit = (data: FormInputs) => {
    const newPerson: Person = {
      id: Date.now(),
      name: data.name,
      cpf: data.cpf,
      country: data.country,
      avatar: data.avatar,
      items: data.items,
    };
    addPerson(newPerson);
    reset();
  };

  return {
    onSubmit,

    register,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
  };
};
