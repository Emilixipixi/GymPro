import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import TabNavigator from './TabNavigator';
import SettingsScreen from '../screens/SettingsScreen';
import Logo from '../components/Logo';

export type DrawerParamList = {
  MiEntrenamiento: undefined;
  Configuracion: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function ContenidoDrawer(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={estilos.contenidoDrawer}>
      <View style={estilos.encabezado}>
        <Logo />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="MiEntrenamiento"
      drawerContent={(props) => <ContenidoDrawer {...props} />}
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
  contenidoDrawer: {
    flex: 1,
    paddingTop: 0,
  },
  encabezado: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    marginBottom: 8,
  },
});