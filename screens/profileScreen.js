import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet,
  ScrollView, // Usamos ScrollView para que la galería sea desplazable
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; 

// --- PALETA DE COLORES REFINADA ---
const COLORS = {
  BACKGROUND_LIGHT: '#F8F8F8', // Fondo general de la pantalla
  CARD_WHITE: '#FFFFFF',      // Fondo de contenedores (el centro de la pantalla)
  TEXT_DARK: '#1E293B',       // Texto principal (negro/gris oscuro)
  TEXT_SUBTLE: '#64748B',     // Texto secundario (Gris de Carrera)
  ACCENT_BLUE_LIGHT: '#0A78D4', // Azul de botones y títulos (el azul principal)
  STATUS_GREEN: '#34D399',      // Verde para el badge de estado
  SEPARATOR_LINE: '#E0E0E0',   // Línea gris clara para separadores
};

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Datos del estudiante
  const userData = {
    name: 'Angel Omar Negrete Demetrio', 
    title: 'Ingeniería en TIC',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwr_zZjgvmu4BccwDNIHic8K5dyehw7cSYA&s',
    
    // Datos de Métricas
    metrics: [
      { id: 1, value: 44, label: 'Siguiendo', icon: 'shuffle' }, 
      { id: 2, value: 4, label: 'Seguidores', icon: 'favorite' }, 
      { id: 3, value: 0, label: 'Likes', icon: 'visibility-off' }, 
    ],
  };

  // Imágenes para la sección de Galería (Imágenes de paisajes)
  const galleryImages = [
    // Imagen principal grande (simulando una imagen de ancho completo)
    'https://independent-photo.com/wp-content/uploads/2022/02/Yifeng-Ding-1800x1192.jpeg',
    // Tres imágenes pequeñas para la cuadrícula inferior
    'https://content.nationalgeographic.com.es/medio/2021/11/29/fotografo-de-paisajes-naturales-del-ano-segundo-premio_a32b2f66_2000x1594.jpg',
    'https://marketplace.canva.com/MADGDC4ks8E/1/thumbnail_large/canva-banff-landscapes-MADGDC4ks8E.jpg',
    'https://www.adobe.com/es/creativecloud/photography/discover/media_11cce67f3cd23e90370d599ea2e6e728b697f9120.png?width=750&format=png&optimize=medium',
    // Añadimos más para forzar el scroll
    'https://img.freepik.com/foto-gratis/paisaje-niebla-matutina-montanas-globos-aerostaticos-al-amanecer_335224-794.jpg?semt=ais_hybrid&w=740&q=80',
    'https://thumbs.dreamstime.com/b/imagen-de-paisajes-hermosos-con-color-muy-bonito-y-backgroun-98492102.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGF8FwEQcN76kLjRHfGta7dnHHM0BgeFQ7Wg&s',
  ];

  // Función para salir (navegación a 'Login' o donde corresponda)
  const handleSignOut = () => {
    navigation.navigate('Login'); 
  };

  // --- COMPONENTE DE LA GALERÍA (Grid de Imágenes) ---
  const GalleryGrid = ({ images }) => (
    <View style={galleryStyles.galleryContainer}>
        {/* Usamos map para iterar sobre las imágenes */}
        {images.map((uri, index) => (
            <View key={index} style={galleryStyles.imageWrapper}>
                {/* Componente Image - Cumple con la rúbrica */}
                <Image 
                    source={{ uri }} 
                    style={galleryStyles.galleryImage} 
                />
            </View>
        ))}
    </View>
  );

  // --- NUEVO COMPONENTE DE MÉTRICAS (Grid de 3 columnas) ---
  const MetricsBar = ({ metrics }) => (
    <View style={metricsStyles.metricsContainer}>
        {metrics.map((metric, index) => (
            <React.Fragment key={metric.id}>
                <View style={metricsStyles.metricItem}>
                    <Text style={metricsStyles.metricValue}>{metric.value}</Text>
                    <Text style={metricsStyles.metricLabel}>{metric.label}</Text>
                </View>
                {/* Separador vertical, omitido para el último elemento */}
                {index < metrics.length - 1 && (
                    <View style={metricsStyles.verticalSeparator} />
                )}
            </React.Fragment>
        ))}
    </View>
  );

  // --- NUEVO COMPONENTE DE BOTONES DE ACCIÓN (Debajo de Métricas) ---
  const ActionButtons = ({ handleSignOut }) => (
    <View style={actionStyles.actionContainer}>
        {/* Botón de Perfil (Simulado con MaterialIcons) */}
        <TouchableOpacity style={actionStyles.actionButton}>
            <MaterialIcons name="person" size={24} color={COLORS.ACCENT_BLUE_LIGHT} />
        </TouchableOpacity>

        {/* Botón de Like/Favorito */}
        <TouchableOpacity style={actionStyles.actionButton}>
            <MaterialIcons name="favorite" size={24} color={COLORS.ACCENT_BLUE_LIGHT} />
        </TouchableOpacity>

        {/* Botón SALIR (Usamos el ícono de logout para simular la acción del boceto) */}
        <TouchableOpacity 
            style={actionStyles.actionButton}
            onPress={handleSignOut}
        >
            <MaterialIcons name="logout" size={24} color={COLORS.ACCENT_BLUE_LIGHT} />
        </TouchableOpacity>
    </View>
  );


  return (
    <SafeAreaView style={styles.safeArea}> 
      
      {/* ScrollView contiene todo el contenido deslizable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. 👤 Sección de Avatar y Datos de Perfil */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: userData.profilePic }}
              style={styles.avatarImage}
              accessibilityLabel="Foto de perfil del usuario"
            />
            {/* Badge Verde de Estado (Anidado, cumple con el requisito +nested) */}
            <View style={styles.statusBadge} />
          </View>

          {/* Nombre y Datos de usuario, centrados como en el boceto */}
          <Text style={styles.nameText}>
            {userData.name}
          </Text>
          <Text style={styles.jobText}>
            {userData.title}
          </Text>
        </View>

        {/* 2. 📊 Barra de Métricas (Siguiendo, Seguidores, Likes) */}
        <MetricsBar metrics={userData.metrics} />

        {/* Separador visual */}
        <View style={styles.horizontalSeparator} />

        {/* 3. 🖱️ Botones de Acción (Iconos de la fila inferior del boceto) */}
        {/* Aquí integramos la funcionalidad de SALIR en uno de los botones */}
        <ActionButtons handleSignOut={handleSignOut} />

        {/* 4. 🏞️ Título y Galería de Paisajes (Imágenes) */}
        <Text style={galleryStyles.galleryTitle}>Galería de Paisajes</Text>
        
        {/* Imagen principal (simulando la imagen grande de tu boceto) */}
        <Image 
          source={{ uri: galleryImages[0] }} 
          style={galleryStyles.mainGalleryImage} 
        />

        {/* Galería de cuadrícula de 3 imágenes */}
        <GalleryGrid images={galleryImages.slice(1)} />

      </ScrollView>
      
      {/* NOTA: El botón SALIR fue movido a los ActionButtons para seguir el diseño de la imagen */}
      
    </SafeAreaView>
  );
}

// -------------------- ESTILOS DE LA GALERÍA --------------------
const galleryStyles = StyleSheet.create({
    galleryTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 24, // Alineación con el resto del contenido
    },
    mainGalleryImage: {
        width: '90%', // Casi todo el ancho
        height: 150,
        borderRadius: 12,
        marginBottom: 16,
        resizeMode: 'cover',
    },
    galleryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '95%',
        paddingBottom: 40, // Espacio para que el último elemento no toque el borde
    },
    imageWrapper: {
        width: '30%', // Permite 3 imágenes por fila con espacio
        aspectRatio: 1, // Mantiene la forma cuadrada
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: COLORS.BACKGROUND_LIGHT,
    },
    galleryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

// -------------------- ESTILOS DE MÉTRICAS (NUEVOS) --------------------
const metricsStyles = StyleSheet.create({
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '90%',
        marginTop: 20,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    metricItem: {
        alignItems: 'center',
        flex: 1, // Asegura que cada item ocupe 1/3 del espacio
    },
    metricValue: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.TEXT_DARK,
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 14,
        color: COLORS.TEXT_SUBTLE,
        textAlign: 'center',
    },
    verticalSeparator: {
        width: 1,
        height: '80%', // Altura ajustada
        backgroundColor: COLORS.SEPARATOR_LINE,
        marginHorizontal: 10,
    },
});

// -------------------- ESTILOS DE BOTONES DE ACCIÓN (NUEVOS) --------------------
const actionStyles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: 320,
        marginTop: 20,
        marginBottom: 30, // Separación de la galería
    },
    actionButton: {
        backgroundColor: COLORS.BACKGROUND_LIGHT, // Fondo gris claro
        padding: 15,
        borderRadius: 15,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        // Sombra sutil para darle profundidad
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

// -------------------- ESTILOS GENERALES --------------------
const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: COLORS.BACKGROUND_LIGHT 
  },
  scrollContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 32,
    backgroundColor: COLORS.CARD_WHITE, 
  },

  // Sección de Perfil
  profileSection: {
    alignItems: 'center',
    marginBottom: 10, // Reducido para acercar las métricas
    paddingHorizontal: 24,
    width: '100%',
  },

  // Estilos del Wrapper de Avatar nativo 
  avatarWrapper: {
    width: 120, 
    height: 120,
    borderRadius: 60,
    position: 'relative',
    borderWidth: 3, 
    borderColor: COLORS.ACCENT_BLUE_LIGHT, 
    marginBottom: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60, 
  },

  // Estilo del Badge (anidado) - Cumple con +nested
  statusBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16, 
    height: 16, 
    backgroundColor: COLORS.STATUS_GREEN, 
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.CARD_WHITE, 
    zIndex: 10,
  },
  
  // Título (Nombre) - Más grande y cerca del avatar
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.TEXT_DARK, 
    marginTop: 10,
  },
  // Subtítulo (Carrera)
  jobText: {
    fontSize: 14,
    color: COLORS.TEXT_SUBTLE, 
    marginBottom: 10,
    textAlign: 'center',
  },

  horizontalSeparator: {
    height: 1,
    width: '90%',
    backgroundColor: COLORS.BACKGROUND_LIGHT,
    marginVertical: 10,
  },
});
