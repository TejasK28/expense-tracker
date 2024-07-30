// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFireStore } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-e90lWnHm41ayx-sOdzJ70VtKQ2iO0oU",
  authDomain: "expense-tracker-96bb3.firebaseapp.com",
  projectId: "expense-tracker-96bb3",
  storageBucket: "expense-tracker-96bb3.appspot.com",
  messagingSenderId: "28421345491",
  appId: "1:28421345491:web:34897598be24142c628426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFireStore(app);