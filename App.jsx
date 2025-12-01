// App.js
import React, { useEffect, useState } from 'react';
import FlashLoadingScreen from './src/screen/Flash';

import Toast from 'react-native-toast-message';
import MainNav from './src/navigations/MianNav';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FlashLoadingScreen />;

  return (
    <>
      <MainNav />
      <Toast />
    </>
  );
}
