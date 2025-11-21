import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Importamos las utilidades de React Navigation para construir el menú personalizado.
import { 
    DrawerContentScrollView, 
    DrawerItemList,
    DrawerContentComponentProps // Tipo para las props del componente
} from '@react-navigation/drawer';

// Este es el componente que se renderizará dentro del menú lateral.
// Debe exportarse como default para que la importación en _layout.tsx funcione.
// CORRECCIÓN: El componente ahora recibe 'props' como argumento con su tipo.
export default function MenuContent({...props}) {
  return (
    <DrawerContentScrollView {...props}>
      {/* Zona Superior del Menú: Personalización visual para el encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerText}>College App</Text>
        <Text style={styles.headerSubtext}>Bienvenido, Usuario</Text>
      </View>
      
      {/* Renderiza los elementos de navegación definidos en Drawer.Screen en _layout.tsx */}
      <DrawerItemList {...props} />
      
      {/* Pie de página o área de información adicional */}
      <View style={styles.footer}>
        {/* Aquí puedes añadir botones de Cerrar Sesión u otra información */}
        <Text style={styles.footerText}>Versión 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#E83E4C', // Color rojo del header
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
  footer: {
    padding: 20,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});