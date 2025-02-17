import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../../firebase/cli.mjs";

window.onload = function() {

    const userTxt = document.querySelector('.m-usr-txt');

    auth.onAuthStateChanged(async (user) => {
        if (user) {
            const cem = user.email;

            const cref = collection(db, "users");
            const qr = fsQuery(cref, where("email", "==", cem));
            const querySnapshot = await getDocs(qr);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                const emx = userData.email;
                const rlx = userData.role;

                if (cem == emx) {
                    if (rlx == "admin") {
                        window.location.href = "admin.html"
                    }
                }
            }

            const hiddenEmail = maskEmail(user.email);
            userTxt.textContent = hiddenEmail;
            userTxt.id = user.email;

        } else {
            window.location.href = "login.html"
            signOut(auth).then(() => {});
        }
    });
}

function maskEmail(email) {
    const [localPart, domainPart] = email.split('@');
    const visiblePart = localPart.substring(0, 5);
    const maskedPart = '*'.repeat(localPart.length - 5);
    return `${visiblePart}${maskedPart}@${domainPart}`;
}