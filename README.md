# GymPro — Taller 2, sobre la base de MiTienda

Este proyecto reutiliza el esqueleto de `Tienda/MiTienda` (app.json, tsconfig.json,
assets, index.ts y package.json) por lo que ya trae exactamente las dependencias
necesarias para el taller, sin instalar nada adicional:

- @react-navigation/native ^7.3.18
- @react-navigation/native-stack ^7.18.10
- @react-navigation/bottom-tabs ^7.18.18
- @react-navigation/drawer ^7.13.10
- @expo/vector-icons ^15.0.2
- react-native-gesture-handler ~2.32.0
- react-native-reanimated 4.5.1 + react-native-worklets 0.10.1
- react-native-safe-area-context ~5.7.0
- react-native-screens ~4.26.0
- expo ~57.0.21

No se agregó `babel.config.js` porque `babel-preset-expo` en esta versión de Expo
ya configura automáticamente Reanimated/Worklets.

## Pasos

1. Copia estos archivos sobre tu proyecto `MiTienda` (o descomprime tal cual, ya
   trae `package.json`/`package-lock.json`).
2. `npm install`
3. `npx expo start`

## Qué se reemplazó de MiTienda

- `App.tsx`: Stack raíz ahora registra `DrawerNavigator` (antes `MainDrawer`) y
  `ChestDetailScreen` (antes `DetailScreen`).
- `src/navigators/DrawerNavigator.tsx`: opciones "Mi Entrenamiento" (carga el
  `TabNavigator` completo) y "Configuración", cada una con ícono.
- `src/navigators/TabNavigator.tsx`: pestañas "Progreso" y "Rutinas" con íconos
  de `@expo/vector-icons`.
- `src/screens/`: se reemplazan `HomeScreen`, `DetailScreen` y `ProfileScreen`
  por `SettingsScreen`, `ProgressScreen`, `RoutineListScreen` y
  `ChestDetailScreen`, siguiendo los nombres exigidos por el taller.
