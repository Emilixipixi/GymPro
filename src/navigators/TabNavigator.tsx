import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProgressScreen from '../screens/ProgressScreen';
import RoutineListScreen from '../screens/RoutineListScreen';

export type TabParamList = {
  Progreso: undefined;
  Rutinas: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#141414',
          borderTopColor: '#262626',
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ focused, color, size }) => {
          let nombreIcono: keyof typeof Ionicons.glyphMap = 'list-outline';

          if (route.name === 'Progreso') {
            nombreIcono = focused ? 'trending-up' : 'trending-up-outline';
          } else if (route.name === 'Rutinas') {
            nombreIcono = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={nombreIcono} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E11D2E',
        tabBarInactiveTintColor: '#7A7A7A',
      })}
    >
      <Tab.Screen name="Progreso" component={ProgressScreen} options={{ title: 'Progreso' }} />
      <Tab.Screen name="Rutinas" component={RoutineListScreen} options={{ title: 'Rutinas' }} />
    </Tab.Navigator>
  );
}