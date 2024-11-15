import { auth } from './firebaseConfig';  // Import auth from firebaseConfig
import { createUserWithEmailAndPassword } from 'firebase/auth';
const registerUser = async (email, password) => {
    const auth = getAuth();  // Initialize auth instance
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered:", userCredential);
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };
  

export { registerUser };
