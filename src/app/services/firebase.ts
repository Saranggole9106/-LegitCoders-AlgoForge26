import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCkYznOLj_WWZk8hOVks8wk4X-izay6rcQ",
  authDomain: "transit-8d92c.firebaseapp.com",
  projectId: "transit-8d92c",
  storageBucket: "transit-8d92c.firebasestorage.app",
  messagingSenderId: "957591580701",
  appId: "1:957591580701:web:40a800fe4f2f4f92a896f4",
  measurementId: "G-WYNCD04DN2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithRedirect(auth, googleProvider);
export const getGoogleRedirectResult = () => getRedirectResult(auth);
