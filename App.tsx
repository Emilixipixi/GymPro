import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerNavigator from './src/navigators/DrawerNavigator';
import ChestDetailScreen from './src/screens/ChestDetailScreen';

export type RootStackParamList = {
  MenuPrincipal: undefined;
  DetalleRutinaPecho: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    <SafeAreaProvider>
      <NavigationContainer theme={temaOscuro}>
        <Stack.Navigator initialRouteName="MenuPrincipal">
          <Stack.Screen
            name="MenuPrincipal"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetalleRutinaPecho"
            component={ChestDetailScreen}
            options={{
              title: 'Rutina de Pecho',
              headerShown: true,
              headerStyle: { backgroundColor: '#141414' },
              headerTintColor: '#FFFFFF',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}