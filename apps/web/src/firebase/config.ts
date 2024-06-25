// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVEU5LE0vj2Qq2Mr548LSW5oMn_c2-7PI',
  authDomain: 'stay-easy-5c7ff.firebaseapp.com',
  projectId: 'stay-easy-5c7ff',
  storageBucket: 'stay-easy-5c7ff.appspot.com',
  messagingSenderId: '1003277049356',
  appId: '1:1003277049356:web:b67ac9fe6e5249a58c9829',
  measurementId: 'G-CQ4BN4F7CB',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
