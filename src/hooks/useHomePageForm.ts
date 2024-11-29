import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Person {
  id: number;
  name: string;
  cpf: string;
  country: string;
  avatar: string;
}

interface Item {
  id: number;
  name: string;
  price: number;
}

const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  cpf: z.string().min(11, "O CPF deve ter 11 dígitos numéricos.").max(11),
  coountry: z.string().min(3, "O país deve ter pelo menos 3 caracteres."),
  avatar: z
    .any()
    .refine((file: FileList) => file?.length > 0, "O avatar é obrigatório."),
});

type FormInputs = z.infer<typeof formSchema>;

export const useHomePageForm = () => {
  const [output, setOutput] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [items] = useState<Item[]>([
    { id: 1, name: "Produto 1", price: 10.99 },
    { id: 2, name: "Produto 2", price: 20.99 },
    { id: 3, name: "Produto 3", price: 30.99 },
  ]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormInputs) => {
    const newPerson: Person = {
      id: people.length + 1,
      name: data.name,
      cpf: data.cpf,
      country: data.coountry,
      avatar: data.avatar,
    };
    setOutput(JSON.stringify(newPerson, null, 2));
    setPeople([...people, newPerson]);
    reset();
  };

  return {
    onSubmit,
    items,
    people,
    selectedPerson,
    setSelectedPerson,
    register,
    handleSubmit,
    errors,
    output, //TODO: remover depois que tudo funcionar
  };
};
