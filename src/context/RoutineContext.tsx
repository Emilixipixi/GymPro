import { createContext, useContext, useState, ReactNode } from 'react';

export type Routine = {
  id: string;
  name: string;
  muscleGroup: string;
  duration: number;
  createdAt: string;
};

type DatosRutina = {
  name: string;
  muscleGroup: string;
  duration: number;
};

type RoutineContextType = {
  routines: Routine[];
  addRoutine: (datos: DatosRutina) => void;
  updateRoutine: (id: string, datos: DatosRutina) => void;
  deleteRoutine: (id: string) => void;
};

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

const rutinasIniciales: Routine[] = [
  {
    id: '1',
    name: 'Pecho y Tríceps',
    muscleGroup: 'Pecho',
    duration: 45,
    createdAt: new Date().toISOString(),
  },
];

export function RoutineProvider({ children }: { children: ReactNode }) {
  const [routines, setRoutines] = useState<Routine[]>(rutinasIniciales);

  const addRoutine = (datos: DatosRutina) => {
    const nuevaRutina: Routine = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...datos,
    };
    setRoutines((actuales) => [...actuales, nuevaRutina]);
  };

  const updateRoutine = (id: string, datos: DatosRutina) => {
    setRoutines((actuales) =>
      actuales.map((rutina) => (rutina.id === id ? { ...rutina, ...datos } : rutina))
    );
  };

  const deleteRoutine = (id: string) => {
    setRoutines((actuales) => actuales.filter((rutina) => rutina.id !== id));
  };

  return (
    <RoutineContext.Provider value={{ routines, addRoutine, updateRoutine, deleteRoutine }}>
      {children}
    </RoutineContext.Provider>
  );
}

export function useRoutines() {
  const contexto = useContext(RoutineContext);
  if (!contexto) {
    throw new Error('useRoutines debe usarse dentro de un RoutineProvider');
  }
  return contexto;
}