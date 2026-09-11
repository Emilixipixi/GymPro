import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const opciones = [
  { icono: 'person-outline' as const, texto: 'Mi cuenta' },
  { icono: 'notifications-outline' as const, texto: 'Notificaciones' },
  { icono: 'moon-outline' as const, texto: 'Apariencia' },
  { icono: 'information-circle-outline' as const, texto: 'Acerca de GymPro' },
];

export default function SettingsScreen() {
  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <Text style={estilos.encabezado}>Configuración</Text>
      {opciones.map((opcion) => (
        <View key={opcion.texto} style={estilos.fila}>
          <Ionicons name={opcion.icono} size={20} color="#E11D2E" />
          <Text style={estilos.textoFila}>{opcion.texto}</Text>
          <Ionicons name="chevron-forward" size={18} color="#666666" />
        </View>
      ))}
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16, paddingTop: 8 },
  encabezado: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#262626',
    gap: 12,
  },
  textoFila: { flex: 1, color: '#FFFFFF', fontSize: 15, fontWeight: '500' },
});