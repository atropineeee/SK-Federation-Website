import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getDatabase, query as rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";
import { getFirestore, collection, where, query as fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD4yEWLzjYTMe-o2MpDiJCmFeWgQbcqNpA",
    authDomain: "sk-federation-web.firebaseapp.com",
    databaseURL: "https://sk-federation-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sk-federation-web",
    storageBucket: "sk-federation-web.firebasestorage.app",
    messagingSenderId: "84780379645",
    appId: "1:84780379645:web:fbaddfd7bface2e7077d94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app);

export { app, db, rtdb, auth };
export { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast }
export { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion }
export { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut }