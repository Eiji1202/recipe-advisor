import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxWNmMpFyQIedX2sYm36JWP_dJY1M7d1g",
  authDomain: "recipe-adviser.firebaseapp.com",
  projectId: "recipe-adviser",
  storageBucket: "recipe-adviser.appspot.com",
  messagingSenderId: "392758458333",
  appId: "1:392758458333:web:85918405d8894df86b2834"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
