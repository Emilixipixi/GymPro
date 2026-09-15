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
      <View style={estilos.textoTarjeta}>
        <Text style={estilos.tituloTarjeta}>{item.name}</Text>
        <Text style={estilos.subtituloTarjeta}>
          {item.muscleGroup} · {item.duration} mins
        </Text>
      </View>
      <View style={estilos.acciones}>
        <Pressable style={estilos.botonAccion} onPress={() => irADetalle(item.id)}>
          <Ionicons name="eye-outline" size={20} color="#9A9A9A" />
        </Pressable>
        <Pressable style={estilos.botonAccion} onPress={() => irAEditar(item.id)}>
          <Ionicons name="pencil-outline" size={20} color="#E1A62E" />
        </Pressable>
        <Pressable style={estilos.botonAccion} onPress={() => deleteRoutine(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#E11D2E" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <EncabezadoApp />
      <Text style={estilos.encabezado}>Rutinas</Text>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={renderizarRutina}
        contentContainerStyle={estilos.lista}
        ListEmptyComponent={
          <Text style={estilos.mensajeVacio}>Aún no tienes rutinas. Crea la primera con el botón +.</Text>
        }
      />
      <Pressable style={estilos.botonFlotante} onPress={irACrear}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16, paddingTop: 8 },
  encabezado: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
  lista: { paddingBottom: 90 },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
    marginBottom: 12,
  },
  textoTarjeta: { flex: 1 },
  tituloTarjeta: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  subtituloTarjeta: { fontSize: 13, color: '#9A9A9A', marginTop: 2 },
  acciones: { flexDirection: 'row', gap: 6 },
  botonAccion: { padding: 6 },
  mensajeVacio: { color: '#9A9A9A', fontSize: 14, textAlign: 'center', marginTop: 40 },
  botonFlotante: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E11D2E',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});