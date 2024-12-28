"use client";

import type { Person } from "@/hooks/useHomePageForm";
import { createContext, useContext, useState } from "react";

interface PeopleContextType {
  people: Person[];
  selectedPerson: Person | null;
  addPerson: (person: Person) => void;
  setSelectedPerson: (person: Person | null) => void;
}

const PeopleContext = createContext<PeopleContextType | undefined>(undefined);

export const PeopleProvider = ({ children }: { children: React.ReactNode }) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const addPerson = (person: Person) => {
    setPeople((prev) => [...prev, person]);
  };

  return (
    <PeopleContext.Provider
      value={{
        people,
        selectedPerson,
        addPerson,
        setSelectedPerson,
      }}
    >
      {children}
    </PeopleContext.Provider>
  );
};

export const usePeople = () => {
  const context = useContext(PeopleContext);
  if (!context) {
    throw new Error("usePeople must be used within a PeopleProvider");
  }
  return context;
};
