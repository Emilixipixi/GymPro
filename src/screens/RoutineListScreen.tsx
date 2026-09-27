import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';
import { useRoutines, type Routine } from '../context/RoutineContext';
import EncabezadoApp from '../components/EncabezadoApp';

type PropiedadesNavegacion = NativeStackNavigationProp<RootStackParamList>;

export default function RoutineListScreen() {
  const navegacion = useNavigation<PropiedadesNavegacion>();
  const { routines, deleteRoutine } = useRoutines();

  const irADetalle = (id: string) => {
    navegacion.navigate('Detail', { id });
  };

  const irAEditar = (id: string) => {
    navegacion.navigate('AddRoutine', { id });
  };

  const irACrear = () => {
    navegacion.navigate('AddRoutine');
  };

    const renderizarRutina = ({ item }: { item: Routine }) => (
    <View style={estilos.tarjeta}>
      <View style={estilos.iconoTarjeta}>
        <Ionicons name="barbell-outline" size={22} color="#E11D2E" />
      </View>
      <View style={estilos.textoTarjeta}>
        <Text style={estilos.tituloTarjeta} numberOfLines={1}>{item.name}</Text>
        <View style={estilos.filaDatos}>
          <View style={estilos.chipGrupo}>
            <Text style={estilos.textoChipGrupo}>{item.muscleGroup}</Text>
          </View>
          <Ionicons name="time-outline" size={14} color="#9A9A9A" />
          <Text style={estilos.subtituloTarjeta}>{item.duration} min</Text>
        </View>
      </View>
      <View style={estilos.acciones}>
        <Pressable style={[estilos.botonAccion, estilos.botonVer]} onPress={() => irADetalle(item.id)}>
          <Ionicons name="eye-outline" size={18} color="#FFFFFF" />
        </Pressable>
        <Pressable style={[estilos.botonAccion, estilos.botonEditar]} onPress={() => irAEditar(item.id)}>
          <Ionicons name="pencil-outline" size={18} color="#E1A62E" />
        </Pressable>
        <Pressable style={[estilos.botonAccion, estilos.botonEliminar]} onPress={() => deleteRoutine(item.id)}>
          <Ionicons name="trash-outline" size={18} color="#E11D2E" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <EncabezadoApp />
      <Text style={estilos.etiquetaSuperior}>TU PLAN DE ENTRENAMIENTO</Text>
      <Text style={estilos.encabezado}>Rutinas</Text>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={renderizarRutina}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={
          <Text style={estilos.mensajeVacio}>Aun no tienes rutinas. Crea la primera con el boton +.</Text>
        }
      />
            <Pressable
        style={({ pressed }) => [estilos.botonFlotante, pressed && estilos.botonPresionado]}
        onPress={irACrear}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16, paddingTop: 8 },
  etiquetaSuperior: {
    color: '#E11D2E',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  encabezado: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', marginTop: 2, marginBottom: 16 },
  lista: { paddingBottom: 100 },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#262626',
    borderLeftWidth: 4,
    borderLeftColor: '#E11D2E',
    marginBottom: 12,
  },
  iconoTarjeta: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(225, 29, 46, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textoTarjeta: { flex: 1 },
  tituloTarjeta: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  filaDatos: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  chipGrupo: {
    backgroundColor: '#262626',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginRight: 4,
  },
  textoChipGrupo: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
  subtituloTarjeta: { fontSize: 13, color: '#9A9A9A' },
  acciones: { flexDirection: 'row', gap: 6, marginLeft: 8 },
  botonAccion: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonVer: { backgroundColor: '#262626' },
  botonEditar: { backgroundColor: 'rgba(225, 166, 46, 0.12)' },
  botonEliminar: { backgroundColor: 'rgba(225, 29, 46, 0.12)' },
  mensajeVacio: { color: '#9A9A9A', fontSize: 14, textAlign: 'center', marginTop: 40 },
  botonFlotante: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E11D2E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#E11D2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  botonPresionado: { opacity: 0.85, transform: [{ scale: 0.96 }] },
});