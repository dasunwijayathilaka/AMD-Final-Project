// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlOhIawwhlROLv0zn0Y2j7FD7tcmlzOEU",
  authDomain: "task-manager-app-24e7b.firebaseapp.com",
  projectId: "task-manager-app-24e7b",
  storageBucket: "task-manager-app-24e7b.firebasestorage.app",
  messagingSenderId: "933802585918",
  appId: "1:933802585918:web:210c92b723e41ab8f7466f",
  measurementId: "G-H1ZNY2CT99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
