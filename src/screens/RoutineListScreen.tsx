import { Text, View, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../../App';

type PropiedadesNavegacion = NativeStackNavigationProp<RootStackParamList>;

export default function RoutineListScreen() {
  const navegacion = useNavigation<PropiedadesNavegacion>();

  const verRutinaDePecho = () => {
    navegacion.navigate('DetalleRutinaPecho');
  };

  return (
    <SafeAreaView style={estilos.contenedor} edges={['top', 'left', 'right']}>
      <Text style={estilos.encabezado}>Rutinas</Text>
      <Pressable
        style={({ pressed }) => [estilos.tarjeta, pressed && estilos.tarjetaPresionada]}
        onPress={verRutinaDePecho}
      >
        <View style={estilos.iconoTarjeta}>
          <Ionicons name="body-outline" size={28} color="#E11D2E" />
        </View>
        <View style={estilos.textoTarjeta}>
          <Text style={estilos.tituloTarjeta}>Rutina de Pecho</Text>
          <Text style={estilos.subtituloTarjeta}>4 ejercicios · Nivel intermedio</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color="#666666" />
      </Pressable>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#0F0F0F', paddingHorizontal: 16, paddingTop: 8 },
  encabezado: { fontSize: 26, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
  },
  tarjetaPresionada: { opacity: 0.75 },
  iconoTarjeta: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2A1214',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textoTarjeta: { flex: 1 },
  tituloTarjeta: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  subtituloTarjeta: { fontSize: 13, color: '#9A9A9A', marginTop: 2 },
});