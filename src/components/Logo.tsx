import { Image, StyleSheet } from 'react-native';

type PropiedadesLogo = {
  url?: string;
  tamano?: number;
};

const urlPorDefecto =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUaHED-uFEhbAN5RC4y3OUT1f8BSDEpr8neFMm9xga0K3iN7wJiSiKiFs&s=10';

export default function Logo({ url = urlPorDefecto, tamano = 90 }: PropiedadesLogo) {
  return (
    <Image
      source={{ uri: url }}
      style={[
        estilos.logo,
        { width: tamano, height: tamano, borderRadius: tamano / 2 },
      ]}
      resizeMode="cover"
    />
  );
}

const estilos = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    backgroundColor: '#1A1A1A',
  },
});