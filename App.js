import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';

// 1. Importar el proveedor de Gluestack-UI y la configuración de tema
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Asegúrate de tener '@gluestack-ui/config' instalado

export default function App() {
  return (
    // 2. Envolver toda la aplicación (incluyendo la navegación)
    //    dentro del GluestackUIProvider
    <GluestackUIProvider config={config}>
      
      {/* 3. Mantener GestureHandlerRootView para la navegación (Drawers, Stacks, etc.) */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
      
    </GluestackUIProvider>
  );
}