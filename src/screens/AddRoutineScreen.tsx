import { useEffect, useState } from 'react';
import { Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../App';
import { useRoutines } from '../context/RoutineContext';

type PropiedadesNavegacion = NativeStackNavigationProp<RootStackParamList>;
type PropiedadesRuta = RouteProp<RootStackParamList, 'AddRoutine'>;

export default function AddRoutineScreen() {
  const navegacion = useNavigation<PropiedadesNavegacion>();
  const ruta = useRoute<PropiedadesRuta>();
  const { routines, addRoutine, updateRoutine } = useRoutines();

  const idEdicion = ruta.params?.id;

  const [nombre, setNombre] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [duracion, setDuracion] = useState('');

  useEffect(() => {
    if (idEdicion) {
      const rutinaExistente = routines.find((rutina) => rutina.id === idEdicion);
      if (rutinaExistente) {
        setNombre(rutinaExistente.name);
        setGrupoMuscular(rutinaExistente.muscleGroup);
        setDuracion(String(rutinaExistente.duration));
      }
    } else {
      setNombre('');
      setGrupoMuscular('');
      setDuracion('');
    }
  }, [idEdicion]);

  const guardarRutina = () => {
    if (!nombre.trim() || !grupoMuscular.trim() || !duracion.trim()) {
      Alert.alert('Campos incompletos', 'Completa nombre, grupo muscular y duración.');
      return;
    }

    const duracionNumerica = parseFloat(duracion);
    if (Number.isNaN(duracionNumerica)) {
      Alert.alert('Duración inválida', 'Ingresa un número válido en duración.');
      return;
    }

    const datos = {
      name: nombre.trim(),
      muscleGroup: grupoMuscular.trim(),
      duration: duracionNumerica,
    };

    if (idEdicion) {
      updateRoutine(idEdicion, datos);
    } else {
      addRoutine(datos);
    }

    navegacion.goBack();
  };

  return (
    <SafeAreaView style={estilos.contenedor} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Text style={estilos.etiqueta}>Nombre</Text>
        <TextInput
          style={estilos.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej: Pecho y Tríceps"
          placeholderTextColor="#666666"
        />

        <Text style={estilos.etiqueta}>Grupo Muscular</Text>
        <TextInput
          style={estilos.input}
          value={grupoMuscular}
          onChangeText={setGrupoMuscular}
          placeholder="Ej: Pecho"
          placeholderTextColor="#666666"
        />

        <Text style={estilos.etiqueta}>Duración (minutos)</Text>
        <TextInput
          style={estilos.input}
          value={duracion}
          onChangeText={setDuracion}
          placeholder="Ej: 45"
          placeholderTextColor="#666666"
          keyboardType="numeric"
        />

        <Pressable style={estilos.botonGuardar} onPress={guardarRutina}>
          <Text style={estilos.textoBotonGuardar}>Guardar</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F' },
  scroll: { padding: 16 },
  etiqueta: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#262626',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 15,
  },
  botonGuardar: {
    backgroundColor: '#E11D2E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  textoBotonGuardar: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});