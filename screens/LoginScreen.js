import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import Titulo from '../components/Titulo';

const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    if (usuario.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Debes ingresar usuario y contraseña');
      return;
    }
    Alert.alert('Autenticado', '¡El usuario ha sido autenticado!');

    // En una aplicación real, aquí harías la llamada a tu API para validar credenciales
    navigation.replace('Main');
  };

  return (
    <View style={styles.container}>
      {/* El componente Titulo se mantiene */}
      <Titulo nombre="Angel Omar Negrete Demetrio" />

      <View style={styles.form}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          placeholderTextColor="#A9A9A9"
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A9A9A9"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ---
// ## Estilos Minimalistas
// ---
const styles = StyleSheet.create({
  container: {
    // Fondo blanco o muy claro
    flex: 1,
    backgroundColor: '#FFFFFF', 
  },
  form: {
    marginTop: 80, // Más espacio arriba para un look limpio
    paddingHorizontal: 30,
  },
  label: {
    // Texto oscuro, simple
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500', // Un poco de peso para destacarse
  },
  input: {
    // Input con fondo blanco y solo un borde inferior sutil
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0', 
    height: 45,
    paddingHorizontal: 0, // Quitamos el padding horizontal interno
    marginBottom: 30, // Más separación entre campos
    fontSize: 16,
    color: '#333333',
  },
  button: {
    // Color principal simple y borde redondeado moderado
    backgroundColor: '#007AFF', // Un azul estándar limpio (puedes usar tu #003572ff si lo prefieres)
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20, // Espacio antes del botón
    // Sombra sutil para darle profundidad
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default LoginScreen;