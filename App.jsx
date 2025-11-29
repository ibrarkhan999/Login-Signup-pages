import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Login from './src/screen/Login'; // your existing login screen
import FlashLoadingScreen from './src/screen/Flash';
import MainNav from './src/navigations/MianNav';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2-second splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FlashLoadingScreen/>

  return <MainNav />;
}

const styles = StyleSheet.create({


});
