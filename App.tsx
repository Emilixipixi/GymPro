import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import RoutineDetailScreen from './src/screens/RoutineDetailScreen';
import AddRoutineScreen from './src/screens/AddRoutineScreen';
import { RoutineProvider } from './src/context/RoutineContext';

export type RootStackParamList = {
  MenuPrincipal: undefined;
  Detail: { id: string };
  AddRoutine: { id?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const nombreUsuario = 'Emilio';
const apellidoUsuario = 'Morales';

const temaOscuro = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0F0F0F',
    card: '#141414',
    text: '#FFFFFF',
    border: '#262626',
  },
};

export default function App() {
  return (
    <RoutineProvider>
      <SafeAreaProvider>
        <NavigationContainer theme={temaOscuro}>
          <Stack.Navigator initialRouteName="MenuPrincipal">
            <Stack.Screen name="MenuPrincipal" options={{ headerShown: false }}>
              {() => <DrawerNavigator nombre={nombreUsuario} apellido={apellidoUsuario} />}
            </Stack.Screen>
            <Stack.Screen
              name="Detail"
              component={RoutineDetailScreen}
              options={{
                title: 'Detalle de Rutina',
                headerStyle: { backgroundColor: '#141414' },
                headerTintColor: '#FFFFFF',
              }}
            />
            <Stack.Screen
              name="AddRoutine"
              component={AddRoutineScreen}
              options={({ route }) => ({
                title: route.params?.id ? 'Editar Rutina' : 'Nueva Rutina',
                headerStyle: { backgroundColor: '#141414' },
                headerTintColor: '#FFFFFF',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </RoutineProvider>
  );
}