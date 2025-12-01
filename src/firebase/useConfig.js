// src/firebase/useConfig.js
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

export const useConfig = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // getAuth() uses the default app; you can pass getAuth(getApp()) if required
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    // cleanup
    return unsubscribe;
  }, [initializing]);

  return { user, initializing };
};
