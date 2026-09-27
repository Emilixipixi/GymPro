import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

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
  addRoutine: (datos: DatosRutina) => Promise<boolean>;
  updateRoutine: (id: string, datos: DatosRutina) => Promise<boolean>;
  deleteRoutine: (id: string) => Promise<void>;
};

export const gruposMusculares = ['Pecho', 'Espalda', 'Piernas', 'Hombros', 'Brazos'];

const RoutineContext = createContext<RoutineContextType | undefined>(undefined);

export function RoutineProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [routines, setRoutines] = useState<Routine[]>([]);

  const cargarRutinas = async () => {
    try {
      const resultado = await db.getAllAsync<Routine>('SELECT * FROM rutinas ORDER BY createdAt ASC');
      setRoutines(resultado);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las rutinas');
    }
  };

  useEffect(() => {
    cargarRutinas();
  }, []);

  const addRoutine = async (datos: DatosRutina) => {
    try {
      await db.runAsync(
        'INSERT INTO rutinas (id, name, muscleGroup, duration, createdAt) VALUES (?, ?, ?, ?, ?)',
        [Date.now().toString(), datos.name, datos.muscleGroup, datos.duration, new Date().toISOString()]
      );
      await cargarRutinas();
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la rutina');
      return false;
    }
  };

  const updateRoutine = async (id: string, datos: DatosRutina) => {
    try {
      await db.runAsync(
        'UPDATE rutinas SET name = ?, muscleGroup = ?, duration = ? WHERE id = ?',
        [datos.name, datos.muscleGroup, datos.duration, id]
      );
      await cargarRutinas();
      return true;
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la rutina');
      return false;
    }
  };

  const deleteRoutine = async (id: string) => {
    try {
      await db.runAsync('DELETE FROM rutinas WHERE id = ?', [id]);
      await cargarRutinas();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la rutina');
    }
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