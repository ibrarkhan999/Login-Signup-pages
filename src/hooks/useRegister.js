// src/hooks/useRegister.js
import { useState } from "react";
import Toast from "react-native-toast-message";
import { RegisterUser } from "../firebase/service";
import { useNavigation } from "@react-navigation/native";

export default function useRegister() {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleInput = (name, value) => {
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = user;

    if (!name || !email || !password) {
      Toast.show({ type: "error", text1: "Fill all fields" });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({ type: "error", text1: "Password not matching" });
      return;
    }

    const reg = await RegisterUser(name, email, password);
    if (reg.uid) navigation.navigate("Home");
  };

  return { user, handleInput, handleRegister, setUser };
}
