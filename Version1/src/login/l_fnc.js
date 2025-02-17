import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../firebase/cli.mjs";

const l_btn = document.querySelector('.l-login-btn');
const l_eml = document.getElementById('email');
const l_psw = document.getElementById('password');
const l_err = document.querySelector('.l-login-error-text');

l_btn.addEventListener('click', sl);

let tx;

async function sl() {
    const ux = l_eml.value;
    const px = l_psw.value;

    try {
        const cref = collection(db, "users");
        const qr = fsQuery(cref, where("email", "==", ux));
        const querySnapshot = await getDocs(qr);

        if (querySnapshot.empty) {
           l_err.textContent = "Invalid Email or Password";

           clearTimeout(tx);
           tx = setTimeout(() => {
                l_err.textContent = "‎";
           }, 2500)
        } else {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            const emx = userData.email;
            const pwx = userData.password;
            const rlx = userData.role;

            if (ux === emx && px === pwx) {
                console.log("User Found!");

                if (rlx == "admin") {
                    signInWithEmailAndPassword(auth, ux, px)
                    .then(() => {
                        reset();
                        window.location.href = "admin.html";
                    })
                }

                if (rlx == "staff") {
                    signInWithEmailAndPassword(auth, ux, px)
                    .then(() => {
                        reset();
                        window.location.href = "main.html";
                    })
                }
            } else if(ux === emx && px !== pwx) {
                l_err.textContent = "Wrong Password!";

                clearTimeout(tx);
                tx = setTimeout(() => {
                    l_err.textContent = "‎";
                }, 2500)
            }
        }
        
    } catch (err) {
        console.log("Error!", err);
    }
}

function reset() {
    l_eml.value = "";
    l_psw.value = "";
}
