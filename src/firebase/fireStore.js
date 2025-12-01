import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getApp } from "firebase/app";

const app = getApp();
const db = getFirestore(app);

// Function to get user info
export const getUserInfo = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        name: data.name,
        email: data.email
      };
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (err) {
    console.log("Error fetching user info:", err.message);
    throw err;
  }
};
