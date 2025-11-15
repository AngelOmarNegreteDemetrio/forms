import React from 'react';
import { ScrollView, Image, Pressable } from 'react-native';
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonText,
  VStack,
  Card,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';


export default function CardScreen({ navigation }) {
  const toast = useToast();

  const handleAddToCart = () => {
    toast.show({
      placement: 'top',
      render: ({ id }) => {
        return (
          <Box alignSelf="center">
            <Toast
              nativeID={String(id)}
              variant="solid"
              action="success"
              bg="#D9F7E0"
              borderRadius={8}
              maxWidth={320}
              p="$4"
              mx="$4"
            >
              <VStack space="xs">
                <Box flexDirection="row" alignItems="flex-start">

                  <Box mr="$3" mt="$1">
                    <Ionicons name="checkmark-circle-outline" size={24} color="#00A300" />
                  </Box>

                  <VStack>
                    <ToastTitle color="#00A300" size="md" fontWeight="bold">Success</ToastTitle>

                    <ToastDescription color="#00A300" fontWeight="500" mt="$1">
                      ¡Gracias por tu compra!
                    </ToastDescription>
                  </VStack>

                </Box>
              </VStack>
            </Toast>
          </Box>
        );
      },
    });
  };


  const dataRows = [
    { client: "Rajesh Kumar", units: 10, cost: "$130" },
    { client: "Priya Sharma", units: 12, cost: "$210" }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <VStack space="xl" p="$5">

        <Heading size="xl" mb="$3" color="#333333">
          Ejemplo de Product Card
        </Heading>

        <Card
          p="$5" rounded="$lg" m="$3" alignSelf="center" width="90%" maxWidth={360}
          backgroundColor="#FFFFFF" shadowColor="#000" shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.15} shadowRadius={3.84} elevation={5}
        >
          <Box width="100%" alignItems="center" mb="$4">
            <Image
              source={{
                uri: 'https://media.istockphoto.com/id/1171169099/es/foto/hombre-con-brazos-cruzados-aislados-sobre-fondo-gris.jpg?s=612x612&w=0&k=20&c=8qDLKdLMm2i8DHXY6crX6a5omVh2IxqrOxJV2QGzgFg=',
              }}
              style={{
                width: '100%', height: 240, borderRadius: 10, resizeMode: 'cover',
              }}
            />
          </Box>

          <Text size="sm" mb="$2" color="#555555">
            Sanrio merch
          </Text>

          <VStack mb="$6">
            <Heading size="md" mb="$3" color="#333333">
              sueter
            </Heading>
            <Text size="sm" color="#555555">
              Marca y personaje ficticio producido por la compañía japonesa Sanrio, que ha sido durante mucho tiempo la más popular de esta compañía.
            </Text>
          </VStack>

          <Box flexDirection="column" sx={{ '@sm': { flexDirection: 'row' } }}>
            <Button
              px="$4"
              py="$2"
              mb="$3"
              sx={{
                '@sm': { mr: '$3', mb: '$0', flex: 1 },
              }}
              bg="#007AFF"
              borderRadius={8}
              onPress={handleAddToCart}
            >
              <ButtonText size="sm" color="#FFFFFF">
                Añadir al carrito
              </ButtonText>
            </Button>

            <Button
              variant="outline"
              px="$4"
              py="$2"
              borderColor="#007AFF"
              sx={{ '@sm': { flex: 1 } }}
              borderRadius={8}
            >
              <ButtonText size="sm" color="#007AFF">
                Wishlist
              </ButtonText>
            </Button>
          </Box>
        </Card>

        <Heading size="xl" mt="$5" color="#333333">
          Ejemplo de Tabla
        </Heading>

        <VStack mt="$3" space="md" bg="#F7F7F7" p="$4" rounded="$lg">

          {/* FILA DE ENCABEZADOS DE LA TABLA */}
          <Box flexDirection="row" justifyContent="space-between" mb="$2">
            <Box flex={1.5}><Text bold color="#333333">Cliente</Text></Box>
            <Box flex={1} alignItems="center"><Text bold color="#333333">Unidades</Text></Box>
            <Box flex={1} alignItems="flex-end"><Text bold color="#333333">Costo</Text></Box>

            <Box width={40} alignItems="flex-end"><Text bold color="#333333">ST</Text></Box>

          </Box>

          {dataRows.map((row, index) => (
            <Box key={index} flexDirection="row" justifyContent="space-between">
              <Box flex={1.5}><Text color="#555555">{row.client}</Text></Box>
              <Box flex={1} alignItems="center"><Text color="#555555">{row.units}</Text></Box>
              <Box flex={1} alignItems="flex-end"><Text color="#555555">{row.cost}</Text></Box>

              <Box width={40} alignItems="flex-end">
                <Pressable
                  style={{ padding: 4 }}
                >
                  <Ionicons name="cart-outline" size={20} color="#007AFF" />
                </Pressable>
              </Box>
            </Box>
          ))}

          {/* FILA DE TOTALES DE LA TABLA */}
          <Box
            flexDirection="row"
            justifyContent="space-between"
            borderTopWidth={1}
            borderColor="#E0E0E0"
            pt="$2"
            mt="$2"
          >
            <Box flex={1.5}><Text bold color="#333333">Total</Text></Box>
            <Box flex={1} alignItems="center"><Text bold color="#333333">22</Text></Box>
            <Box flex={1} alignItems="flex-end"><Text bold color="#333333">$340</Text></Box>
            <Box width={40}></Box>
          </Box>
        </VStack>
      </VStack>
    </ScrollView>
  );
}