import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet 
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // Usamos MaterialIcons para el icono del menú

// --- PALETA DE COLORES REFINADA (Tomada de tu componente CompraProducto) ---
const COLORS = {
  BACKGROUND_LIGHT: '#F8F8F8',
  CARD_WHITE: '#FFFFFF',
  TEXT_DARK: '#1E293B',
  TEXT_SUBTLE: '#64748B',
  BORDER_LINE: '#E2E8F0',
  PRIMARY_ACCENT: '#0F766E', // Color verde/teal
  SECONDARY_BLUE: '#0A78D4', // Azul de tu imagen de referencia para el botón y títulos
};

export default function ProfileScreen() {
  const navigation = useNavigation();

  const userData = {
    name: 'Angel Omar Negrete Demetrio',
    title: 'Ingeniería en TIC',
    profilePic: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
    // Avatar placeholders (usaremos flaticon o expo-icons para simular)
    icon1: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', // Hombre de negocios
    icon2: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png', // Silueta de persona
    icon3: 'https://cdn-icons-png.flaticon.com/512/847/847969.png', // Silueta gris
  };

  // Función para volver al formulario (asumiendo que tu ruta se llama 'CompraProducto' o 'Forms')
  const handleGoBack = () => {
    // Cambia 'CompraProducto' al nombre real de tu ruta de formulario si es diferente
    navigation.navigate('CompraProducto'); 
  };

  return (
    // Es CRUCIAL deshabilitar el header de react-navigation para usar este header custom
    <SafeAreaView style={styles.safeArea}> 
      
     

      {/* -------------------- CONTENIDO DE LA PANTALLA -------------------- */}
      <View style={styles.contentContainer}> 
        
        {/* 1. 👤 Sección de Avatar y Título de Perfil */}
        <View style={styles.profileSection}>
          
          {/* Avatar con borde y badge */}
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: userData.profilePic }}
              style={styles.avatarImage}
              accessibilityLabel="Foto de perfil de la usuaria"
            />
            {/* Badge Verde de Estado */}
            <View style={styles.statusBadge} />
          </View>

          {/* Título y Datos */}
          <Text style={styles.mainTitle}>
            Perfil del Usuario
          </Text>
          <Text style={styles.dataLine}>
            Nombre: <Text style={styles.dataValue}>{userData.name}</Text>
          </Text>
          <Text style={styles.dataLine}>
            Carrera: <Text style={styles.dataValue}>{userData.title}</Text>
          </Text>
        </View>

        {/* 3. ↩️ Botón Principal de Acción */}
        <TouchableOpacity 
          style={styles.actionButton} 
           onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.actionButtonText}>
            Volver al Formulario
          </Text>
        </TouchableOpacity>

        {/* 4. 🖼️ Imágenes/Iconos Decorativos */}
        <View style={styles.iconContainer}> 
          
          <View style={styles.iconBox}>
            <Image style={styles.iconImage} source={{ uri: userData.icon1 }} />
          </View>
          
          <View style={styles.iconBox}>
            <Image style={styles.iconImage} source={{ uri: userData.icon2 }} />
          </View>
          
          <View style={[styles.iconBox, styles.iconBoxPlaceholder]}>
            <Image style={[styles.iconImage, styles.iconPlaceholder]} source={{ uri: userData.icon3 }} />
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: COLORS.CARD_WHITE 
  },
  
  // -------------------- HEADER ESTILOS --------------------
  customHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LINE,
    backgroundColor: COLORS.CARD_WHITE,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
  },
  spacer: { // Para centrar el título, usa el mismo ancho que el botón de menú
    width: 24 + 16, // Tamaño del icono + padding
  },

  // -------------------- CONTENIDO ESTILOS --------------------
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: COLORS.CARD_WHITE,
  },

  // Sección de Perfil
  profileSection: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 112, // w-28
    height: 112, // h-28
    borderRadius: 56,
    position: 'relative',
    borderWidth: 3,
    borderColor: COLORS.SECONDARY_BLUE, // Azul para el borde del avatar
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 56,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 16, // w-4
    height: 16, // h-4
    backgroundColor: '#34D399', // Verde genérico
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.CARD_WHITE,
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.SECONDARY_BLUE,
    marginTop: 16,
  },
  dataLine: {
    fontSize: 15,
    color: COLORS.TEXT_SUBTLE,
    fontWeight: '400',
    marginTop: 4,
  },
  dataValue: {
    fontWeight: '600',
    color: COLORS.TEXT_DARK,
  },

  // Botón de Acción
  actionButton: {
    marginTop: 24,
    width: '100%',
    maxWidth: 320, // max-w-xs
    height: 40,
    backgroundColor: COLORS.SECONDARY_BLUE,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    // Sombra (simulación)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    color: COLORS.CARD_WHITE,
    fontWeight: '600',
    fontSize: 16,
  },

  // Contenedor de Íconos
  iconContainer: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  iconBox: {
    width: 80, 
    height: 80, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  iconImage: {
    width: '100%',
    height: '100%',
  },
  iconPlaceholder: {
    opacity: 0.4,
  }
});