import React from 'react';
import { View, Button, Alert } from 'react-native';
import { LogoutUser } from '../firebase/service';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function Home() {
  const navigation = useNavigation();

const handleLogout = async () => {
  try {
    await LogoutUser();
    Toast.show({ type: 'success', text1: "Logged out successfully" });

  } catch (e) {
    Toast.show({ type: 'error', text1: e.message });
  }
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
