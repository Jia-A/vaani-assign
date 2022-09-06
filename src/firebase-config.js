import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBgk6g3VjR9kxuNFl4lSyqkBfVzJ1iYDdQ",
  authDomain: "vaani-assignment.firebaseapp.com",
  projectId: "vaani-assignment",
  storageBucket: "vaani-assignment.appspot.com",
  messagingSenderId: "160714674891",
  appId: "1:160714674891:web:bf02582a5c444ba8cf814e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);