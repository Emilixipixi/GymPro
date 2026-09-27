import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import type { RootStackParamList } from '../../App';
import { useRoutines, gruposMusculares } from '../context/RoutineContext';

type PropiedadesNavegacion = NativeStackNavigationProp<RootStackParamList>;
type PropiedadesRuta = RouteProp<RootStackParamList, 'AddRoutine'>;

type ErroresFormulario = {
  nombre?: string;
  grupoMuscular?: string;
  duracion?: string;
};

const duracionMinima = 10;
const duracionMaxima = 180;

export default function AddRoutineScreen() {
  const navegacion = useNavigation<PropiedadesNavegacion>();
  const ruta = useRoute<PropiedadesRuta>();
  const { routines, addRoutine, updateRoutine } = useRoutines();

  const idEdicion = ruta.params?.id;

  const [nombre, setNombre] = useState('');
  const [grupoMuscular, setGrupoMuscular] = useState('');
  const [duracion, setDuracion] = useState('');
  const [errores, setErrores] = useState<ErroresFormulario>({});

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
    setErrores({});
  }, [idEdicion]);

  const validarFormulario = () => {
    const nuevosErrores: ErroresFormulario = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!grupoMuscular.trim()) {
      nuevosErrores.grupoMuscular = 'Selecciona un grupo muscular';
    }

    const duracionNumerica = Number(duracion.trim());
    if (!duracion.trim()) {
      nuevosErrores.duracion = 'La duración es obligatoria';
    } else if (Number.isNaN(duracionNumerica)) {
      nuevosErrores.duracion = 'La duracion debe ser un numero';
    } else if (duracionNumerica < duracionMinima || duracionNumerica > duracionMaxima) {
      nuevosErrores.duracion = `La duracion debe estar entre ${duracionMinima} y ${duracionMaxima} minutos`;
    }

    return nuevosErrores;
  };

  const guardarRutina = () => {
    const nuevosErrores = validarFormulario();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    const datos = {
      name: nombre.trim(),
      muscleGroup: grupoMuscular,
      duration: Number(duracion.trim()),
    };

    if (idEdicion) {
      updateRoutine(idEdicion, datos);
      Alert.alert('Rutina actualizada', `"${datos.name}" se actualizo correctamente`);
    } else {
      addRoutine(datos);
      Alert.alert('Rutina guardada', `"${datos.name}" se creo correctamente`);
    }

    navegacion.goBack();
  };

  const cambiarNombre = (texto: string) => {
    setNombre(texto);
    setErrores((actuales) => ({ ...actuales, nombre: undefined }));
  };

  const seleccionarGrupo = (grupo: string) => {
    setGrupoMuscular(grupo);
    setErrores((actuales) => ({ ...actuales, grupoMuscular: undefined }));
  };

  const cambiarDuracion = (texto: string) => {
    setDuracion(texto);
    setErrores((actuales) => ({ ...actuales, duracion: undefined }));
  };

  return (
    <SafeAreaView style={estilos.contenedor} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Text style={estilos.etiqueta}>Nombre</Text>
        <TextInput
          style={[estilos.input, errores.nombre && estilos.inputError]}
          value={nombre}
          onChangeText={cambiarNombre}
          placeholder="Ej: Pecho y Tríceps"
          placeholderTextColor="#666666"
        />
        {errores.nombre && <Text style={estilos.textoError}>{errores.nombre}</Text>}

        <Text style={estilos.etiqueta}>Grupo Muscular</Text>
        <View style={estilos.grupos}>
          {gruposMusculares.map((grupo) => {
            const seleccionado = grupoMuscular === grupo;
            return (
              <Pressable
                key={grupo}
                style={[
                  estilos.chipGrupo,
                  seleccionado && estilos.chipGrupoSeleccionado,
                  errores.grupoMuscular && estilos.chipGrupoError,
                ]}
                onPress={() => seleccionarGrupo(grupo)}
              >
                <Text style={[estilos.textoChipGrupo, seleccionado && estilos.textoChipGrupoSeleccionado]}>
                  {grupo}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {errores.grupoMuscular && <Text style={estilos.textoError}>{errores.grupoMuscular}</Text>}

        <Text style={estilos.etiqueta}>Duracion (minutos)</Text>
        <TextInput
          style={[estilos.input, errores.duracion && estilos.inputError]}
          value={duracion}
          onChangeText={cambiarDuracion}
          placeholder="Entre 10 y 180"
          placeholderTextColor="#666666"
          keyboardType="numeric"
        />
        {errores.duracion && <Text style={estilos.textoError}>{errores.duracion}</Text>}

        <Pressable style={estilos.botonGuardar} onPress={guardarRutina}>
          <Text style={estilos.textoBotonGuardar}>{idEdicion ? 'Actualizar' : 'Guardar'}</Text>
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
  inputError: { borderColor: '#E11D2E' },
  textoError: { color: '#FF5A67', fontSize: 12, marginTop: 6 },
  grupos: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipGrupo: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#262626',
  },
  chipGrupoSeleccionado: { backgroundColor: '#E11D2E', borderColor: '#E11D2E' },
  chipGrupoError: { borderColor: '#E11D2E' },
  textoChipGrupo: { color: '#9A9A9A', fontSize: 14, fontWeight: '600' },
  textoChipGrupoSeleccionado: { color: '#FFFFFF' },
  botonGuardar: {
    backgroundColor: '#E11D2E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  textoBotonGuardar: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});