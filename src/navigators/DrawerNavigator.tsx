import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import Logo from '../components/Logo';

export type DrawerParamList = {
  MiEntrenamiento: undefined;
  Configuracion: undefined;
};

type PropiedadesDrawerNavigator = {
  nombre: string;
  apellido: string;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function ContenidoDrawer(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={estilos.contenidoDrawer}>
      <View style={estilos.encabezado}>
        <Logo />
        <Text style={estilos.nombreUsuario}>
          {props.nombre} {props.apellido}
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator({ nombre, apellido }: PropiedadesDrawerNavigator) {
  return (
    <Drawer.Navigator
      initialRouteName="MiEntrenamiento"
      drawerContent={(props) => <ContenidoDrawer {...props} nombre={nombre} apellido={apellido} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#141414' },
        headerTintColor: '#FFFFFF',
        drawerStyle: { backgroundColor: '#141414' },
        drawerActiveBackgroundColor: '#E11D2E',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#B3B3B3',
      }}
    >
      <Drawer.Screen
        name="MiEntrenamiento"
        component={TabNavigator}
        options={{
          title: 'Mi Entrenamiento',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Configuracion"
        component={SettingsScreen}
        options={{
          title: 'Configuración',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const estilos = StyleSheet.create({
  contenidoDrawer: { flex: 1, paddingTop: 0 },
  encabezado: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    marginBottom: 8,
    alignItems: 'center',
    gap: 10,
  },
  nombreUsuario: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});