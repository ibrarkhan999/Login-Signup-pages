import { useState } from "react"
import Toast from "react-native-toast-message";


export default function useRegister() {

const[user, setUser] = useState({
    name : "",
    email : "",
    password : "",
    confirmPassword : ""
})


  const handleInput = (name, value) => {
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = () => {
    const {name,email,password,confirmPassword} = user
    if(!name || !email || !password){
        Toast.show({type:'error', text1:"Fill All Fields"})
    }
    if(password !== confirmPassword){
        Toast.show({type:'error', text1:"Password not Matching"})
    }

  }




  return {user, setUser, handleInput,handleRegister}
}

