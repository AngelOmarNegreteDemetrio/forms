import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Alert, 
  StyleSheet 
} from 'react-native';

import { getDatabase, ref, set } from 'firebase/database';
import { auth } from '../firebase.config';

const LoginScreen = ({ navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  // 🔹 VALIDAR CAMPOS
  const handleSignIn = async () => {
    if (usuario.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Debes ingresar correo y contraseña.');
      return;
    }

    Alert.alert("OK", "Login validado (aquí puedes agregar autenticación si quieres)");
  };

  // 🔹 REGISTRAR USUARIO EN REALTIME DATABASE
  const writeUserData = (usuario, password) => {
    const db = getDatabase();

    return set(ref(db, 'users/' + usuario.replace(/\./g, "_")), {
      usuario: usuario,
      password: password
    })
      .then(() => {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* 🔹 LLAMA A LAS DOS FUNCIONES CORRECTAMENTE */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            writeUserData(usuario, password);
            handleSignIn();
          }}
        >
          <Text style={styles.buttonText}>Iniciar Sesión / Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  form: {
    marginTop: 80,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 45,
    fontSize: 16,
    color: '#333333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#E83E4C',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default LoginScreen;
