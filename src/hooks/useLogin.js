import { useState } from "react";
import { Alert } from "react-native";


export default function useLogin() {
  const [user, setUser] = useState({
    email : "",
    password : ''
  });


  const handleInput = (name, value) => {
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleLogin = () => {
    Alert.alert(user.email)
console.log(user)
  }

  return {handleInput,handleLogin,user, setUser}
}

