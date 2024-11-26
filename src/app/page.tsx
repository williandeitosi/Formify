"use client";

import { useState } from "react";
import Image from "next/image";

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

export default function HomePage() {
  const [people, setPeople] = useState<Person[]>([]);
  const [items] = useState<Item[]>([
    { id: 1, name: "Produto 1", price: 10.99 },
    { id: 2, name: "Produto 2", price: 20.99 },
    { id: 3, name: "Produto 3", price: 30.99 },
  ]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPerson: Person = {
      id: people.length + 1,
      name: formData.get("name") as string,
      cpf: formData.get("cpf") as string,
      country: formData.get("country") as string,
      avatar: URL.createObjectURL(formData.get("avatar") as File),
    };
    setPeople([...people, newPerson]);
    e.currentTarget.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Perfil do Usuário</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-gray-700"
                >
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  País
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
                  name="avatar"
                  accept="image/*"
                  required
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Salvar Perfil
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Lista de Itens</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded"
                  >
                    <span>{item.name}</span>
                    <span className="font-semibold">
                      R$ {item.price.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Lista de Pessoas</h2>
              <ul className="space-y-2">
                {people.map((person) => (
                  <li
                    key={person.id}
                    className="flex items-center space-x-4 bg-gray-100 p-2 rounded cursor-pointer"
                    onClick={() => setSelectedPerson(person)}
                  >
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-gray-600">{person.country}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {selectedPerson && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <Image
                src={selectedPerson.avatar}
                alt={selectedPerson.name}
                width={80}
                height={80}
                className="mx-auto rounded-full"
              />
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedPerson.name}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  CPF: {selectedPerson.cpf}
                </p>
                <p className="text-sm text-gray-500">
                  País: {selectedPerson.country}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-indigo-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  onClick={() => setSelectedPerson(null)}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
