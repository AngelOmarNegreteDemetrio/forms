import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

export default function DrawerContent(props) {
  const { navigation, state } = props;

  const currentRoute = state?.routeNames[state?.index];

  const handleLogout = () => {
    const rootNav = navigation.getParent();
    if (rootNav) rootNav.replace('Login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.items}>
        <DrawerItem
          label="Inicio"
          focused={currentRoute === 'Simulando'}
          onPress={() => navigation.navigate('Simulando')}
          labelStyle={[
            styles.label,
            currentRoute === 'Simulando' && styles.activeLabel,
          ]}
          style={[
            styles.item,
            currentRoute === 'Simulando' && styles.activeItem,
          ]}
        />
        <DrawerItem
          label="Cerrar sesión"
          onPress={handleLogout}
          labelStyle={styles.label}
          style={styles.item}
        />
        <DrawerItem
          label="Profile" // El texto del menú
          onPress={() => navigation.navigate('ProfileScreen')} // La acción de navegación
          labelStyle={styles.label} // Mantiene el estilo de la etiqueta (texto)
          style={styles.item} // Mantiene el estilo del contenedor del ítem
        />
          <DrawerItem
          label="CardScreen" // El texto del menú
          onPress={() => navigation.navigate('CardScreen')} // La acción de navegación
          labelStyle={styles.label} // Mantiene el estilo de la etiqueta (texto)
          style={styles.item} // Mantiene el estilo del contenedor del ítem
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  items: { marginTop: 20 },
  item: { borderRadius: 12 },
  activeItem: {
    backgroundColor: '#1E40AF',
  },
  label: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '500',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
