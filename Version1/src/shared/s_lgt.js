import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../firebase/cli.mjs";

const s_outbtn = document.querySelector('.m-tbar-side-llout');

s_outbtn.addEventListener('click', lxd);

function lxd() {
    window.location.href = "login.html";
    signOut(auth).then(() =>{});
}