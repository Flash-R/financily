// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLzf1B5kVuY_mAdpjHfruIpJVr1wsfBxg",
  authDomain: "financely-a47c9.firebaseapp.com",
  projectId: "financely-a47c9",
  storageBucket: "financely-a47c9.appspot.com",
  messagingSenderId: "941468639629",
  appId: "1:941468639629:web:4b877524cb22c988d99dc4",
  measurementId: "G-BRJMFM4WMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { db, auth, provider, doc, setDoc };