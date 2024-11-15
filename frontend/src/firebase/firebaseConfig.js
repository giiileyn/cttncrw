import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC1GhBva5FL3UcUsoTnmu6aiyTywDJ40nk',
  authDomain: 'cttncrw-2b10e.firebaseapp.com',
  projectId: 'cttncrw-2b10e',
  storageBucket: 'cttncrw-2b10e.firebasestorage.app',
  messagingSenderId: '78388709501',
  appId: '1:78388709501:web:6f35d670fa3c7e724a0914',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);


// Example: Register a user
const handleRegister = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  
export { auth };
