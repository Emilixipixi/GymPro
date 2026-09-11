import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProgressScreen() {
  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <Text style={estilos.encabezado}>Progreso</Text>
      <View style={estilos.tarjeta}>
        <Ionicons name="trending-up-outline" size={28} color="#E11D2E" />
        <Text style={estilos.mensaje}>Aún no registras entrenamientos. ¡Empieza tu primera rutina!</Text>
      </View>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16, paddingTop: 8 },
  encabezado: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
  tarjeta: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#262626',
    alignItems: 'center',
    gap: 10,
  },
  mensaje: { color: '#9A9A9A', fontSize: 14, textAlign: 'center' },
});