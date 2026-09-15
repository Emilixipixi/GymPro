import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import type { RootStackParamList } from '../../App';
import { useRoutines } from '../context/RoutineContext';

type PropiedadesRuta = RouteProp<RootStackParamList, 'Detail'>;

export default function RoutineDetailScreen() {
  const ruta = useRoute<PropiedadesRuta>();
  const { routines } = useRoutines();

  const rutina = routines.find((item) => item.id === ruta.params.id);

  if (!rutina) {
    return (
      <SafeAreaView style={estilos.contenedor} edges={['left', 'right', 'bottom']}>
        <Text style={estilos.mensajeVacio}>Esta rutina ya no existe.</Text>
      </SafeAreaView>
    );
  }

  const fechaCreacion = new Date(rutina.createdAt).toLocaleString();

  return (
    <SafeAreaView style={estilos.contenedor} edges={['left', 'right', 'bottom']}>
      <View style={estilos.tarjetaPrincipal}>
        <Text style={estilos.nombre}>{rutina.name}</Text>
        <Text style={estilos.grupoMuscular}>{rutina.muscleGroup}</Text>
      </View>

      <View style={estilos.fila}>
        <Ionicons name="time-outline" size={20} color="#9A9A9A" />
        <Text style={estilos.filaTexto}>{rutina.duration} minutos de duración</Text>
      </View>

      <View style={estilos.fila}>
        <Ionicons name="calendar-outline" size={20} color="#9A9A9A" />
        <Text style={estilos.filaTexto}>Creada el {fechaCreacion}</Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', padding: 16 },
  tarjetaPrincipal: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262626',
    marginBottom: 20,
  },
  nombre: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  grupoMuscular: { fontSize: 15, color: '#E11D2E', fontWeight: '600', marginTop: 6 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  filaTexto: { color: '#FFFFFF', fontSize: 15 },
  mensajeVacio: { color: '#9A9A9A', fontSize: 14, textAlign: 'center', marginTop: 40 },
});