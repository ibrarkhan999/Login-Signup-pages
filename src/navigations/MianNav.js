import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/Login';
import Register from '../screen/Register';
import Home from '../screen/Home';
import { useConfig } from '../firebase/useConfig';

const Stack = createNativeStackNavigator();

export default function MainNav() {
  const { user, initializing } = useConfig();

  // while firebase initializes, render nothing (or a splash)
  if (initializing) return null; // or <Splash /> component

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
