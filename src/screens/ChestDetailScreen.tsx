import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type Ejercicio = {
  id: string;
  nombre: string;
  series: string;
  descanso: string;
};

const ejerciciosPecho: Ejercicio[] = [
  { id: '1', nombre: 'Press de banca plano', series: '4 x 10', descanso: '90 seg' },
  { id: '2', nombre: 'Press inclinado con mancuernas', series: '4 x 12', descanso: '75 seg' },
  { id: '3', nombre: 'Aperturas en polea', series: '3 x 15', descanso: '60 seg' },
  { id: '4', nombre: 'Fondos en paralelas', series: '3 x al fallo', descanso: '90 seg' },
];

export default function ChestDetailScreen() {
  return (
    <SafeAreaView style={estilos.contenedor} edges={['left', 'right', 'bottom']}>
      <ScrollView contentContainerStyle={estilos.scroll}>
        <Text style={estilos.titulo}>Rutina de Pecho</Text>
        <Text style={estilos.subtitulo}>4 ejercicios · Enfoque en fuerza e hipertrofia</Text>

        {ejerciciosPecho.map((ejercicio, indice) => (
          <View key={ejercicio.id} style={estilos.tarjeta}>
            <View style={estilos.numero}>
              <Text style={estilos.numeroTexto}>{indice + 1}</Text>
            </View>
            <View style={estilos.info}>
              <Text style={estilos.nombreEjercicio}>{ejercicio.nombre}</Text>
              <View style={estilos.filaDetalle}>
                <Ionicons name="repeat-outline" size={16} color="#9A9A9A" />
                <Text style={estilos.detalleTexto}>{ejercicio.series}</Text>
                <Ionicons name="time-outline" size={16} color="#9A9A9A" />
                <Text style={estilos.detalleTexto}>{ejercicio.descanso}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F' },
  scroll: { padding: 16, paddingBottom: 32 },
  titulo: { fontSize: 24, fontWeight: '700', color: '#FFFFFF' },
  subtitulo: { fontSize: 13, color: '#9A9A9A', marginTop: 4, marginBottom: 20 },
  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#262626',
  },
  numero: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E11D2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numeroTexto: { color: '#FFFFFF', fontWeight: '700' },
  info: { flex: 1 },
  nombreEjercicio: { fontSize: 15, fontWeight: '600', color: '#FFFFFF' },
  filaDetalle: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  detalleTexto: { fontSize: 13, color: '#9A9A9A', marginRight: 8 },
});