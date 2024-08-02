import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log('Google User:', user);
  } catch (error) {
    console.error('Error logging in with Google:', error);
  }
};

export { signInWithGoogle };
