import { View, Text, StyleSheet } from 'react-native';
import Logo from './Logo';

export default function EncabezadoApp() {
  return (
    <View style={estilos.contenedor}>
      <Logo tamano={90} />
      
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    marginBottom: 16,
  },
  nombreApp: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 1,
  },
});