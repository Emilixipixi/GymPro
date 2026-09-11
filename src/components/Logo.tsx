import { Image, StyleSheet } from 'react-native';

type PropiedadesLogo = {
  ancho?: number;
  alto?: number;
};

export default function Logo({ ancho = 180, alto = 60 }: PropiedadesLogo) {
  return (
    <Image
      source={{ uri: 'https://cdn.vectorstock.com/i/1000v/27/41/male-bodybuilder-icon-gym-logo-vector-46442741.jpg' }}
      style={[estilos.logo, { width: ancho, height: alto }]}
      resizeMode="contain"
    />
  );
}

const estilos = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});