// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6nMTOdZO6jmDrurVEfTNgY3ZSUlULLFE",
  authDomain: "mythic-music-425506-g3.firebaseapp.com",
  projectId: "mythic-music-425506-g3",
  storageBucket: "mythic-music-425506-g3.appspot.com",
  messagingSenderId: "668188068629",
  appId: "1:668188068629:web:766e70c715db28eab3771c",
  measurementId: "G-MTJSMBSCFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);