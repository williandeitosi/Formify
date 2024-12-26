"use client";
import { useAuth } from "@/hooks/useAuth";
import { useHomePageForm } from "@/hooks/useHomePageForm";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardForm from "../components/forms/DashboardForm";
// TODO: fazer o back-end para pegar a imgaem e transfromar em base64 para salvar no banco de dados
// depois fazer o GET para lista todas as pessoas
// quando clicar na pessoa vai abrir um modal onde vai fazer um GET para listar todos os itens que a pessoa tem
export default function HomePage() {
  const { people, selectedPerson, setSelectedPerson } = useHomePageForm();
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login");
    }
  }, [loading, token]);

  if (loading) {
    return <Spinner color="warning" label="Loading..." />;
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Perfil do Usuário</h1>
            <DashboardForm />
            {/* [ ]: preciso criar um botao de adicionar item para uma pessoa , este item tem apenas nome e preço */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Lista de Pessoas</h2>
              <ul className="space-y-2">
                {people.map((person) => (
                  <li
                    key={person.id}
                    className="flex items-center space-x-4 bg-gray-100 p-2 rounded cursor-pointer"
                    onClick={() => setSelectedPerson(person)}
                  >
                    {/* [ ]: mudar para aceitar imagem base64 ou colocar em algum storage */}
                    <Image
                      src={
                        "https://images.pexels.com/photos/9072375/pexels-photo-9072375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      }
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
