import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Replace these placeholder values with your actual Firebase project config
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use 
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGQXy7GwX3hShZr_gT3nUWy_7gSrZEs88",
  authDomain: "artelier-32e67.firebaseapp.com",
  projectId: "artelier-32e67",
  storageBucket: "artelier-32e67.firebasestorage.app",
  messagingSenderId: "135750468190",
  appId: "1:135750468190:web:bfaf74c30e6ef684e42acf",
  measurementId: "G-3JWKRQDHBX"
};
 

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 
 

