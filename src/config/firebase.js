// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2caHFz8e6qE3vAKLzCLi5s4f8IW75QYM",
  authDomain: "fir-course-b4e47.firebaseapp.com",
  projectId: "fir-course-b4e47",
  storageBucket: "fir-course-b4e47.appspot.com",
  messagingSenderId: "991916480431",
  appId: "1:991916480431:web:3f11dfe91ec112d39fc15a",
  measurementId: "G-KBRYN5X99D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
////////////////////////////////////////////
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  provider,
  db,
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  ref,
  uploadBytes
};
