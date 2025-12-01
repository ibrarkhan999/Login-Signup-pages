// src/firebase/service.js
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

// Register user
export const RegisterUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: serverTimestamp()
    });

    return user;
  } catch (err) {
    console.log("Register Error:", err.code, err.message);
    throw err;
  }
};

// Login user
export const LoginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (err) {
    console.log("Login Error:", err.code, err.message);
    throw err;
  }
};

// Logout user
export const LogoutUser = async () => {
  try {
    await auth.signOut();
    console.log("User logged out successfully");
  } catch (err) {
    console.log("Logout Error:", err.code, err.message);
  }
};

// Get user info (name & email) from Firestore
export const GetUserInfo = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (err) {
    console.log("GetUserInfo Error:", err.code, err.message);
    throw err;
  }
};
