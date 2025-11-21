import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import Simulando from '../screens/Simulando';
import ProfileScreen from '../screens/profileScreen';
import CardScreen from '../screens/CardScreen';
import DrawerContent from './DrawerContent';
import firebase from '../screens/firebase';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#003572ff',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Simulando"
        component={Simulando}
        options={({ navigation }) => ({
          headerTitle: 'Angel Omar',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
            </TouchableOpacity>
          ),
        })}

      />

      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: 'Angel Omar',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
            </TouchableOpacity>
          ),
        })}

      />
       <Drawer.Screen
        name="CardScreen"
        component={CardScreen}
        options={({ navigation }) => ({
          headerTitle: 'Angel Omar',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
            </TouchableOpacity>
          ),
        })}

      />

      <Drawer.Screen
        name="firebase"
        component={firebase}
        options={({ navigation }) => ({
          headerTitle: 'Angel Omar',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 15 }}
            >
              <Text style={{ fontSize: 24, color: '#fff' }}>☰</Text>
            </TouchableOpacity>
          ),
        })}

      />

    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
              <Stack.Screen name="CardScreen" component={CardScreen} />
        <Stack.Screen name="profileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
