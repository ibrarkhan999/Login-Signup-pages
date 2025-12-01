// src/hooks/useLogin.js
import { useState } from "react";
import Toast from "react-native-toast-message";
import { LoginUser } from "../firebase/service";
import { useNavigation } from "@react-navigation/native";

export default function useLogin() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ email: "", password: "" });

  const handleInput = (name, value) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = user;

    if (!email || !password) {
      Toast.show({ type: "error", text1: "Fill all fields" });
      return;
    }

    const log = await LoginUser(email, password);
    console.log(log);
    navigation.navigate("Home");
  };

  return { handleInput, handleLogin, user, setUser };
}
