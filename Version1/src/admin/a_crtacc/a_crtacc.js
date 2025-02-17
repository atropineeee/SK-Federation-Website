import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../../firebase/cli.mjs";

import { XFNC, XLNC, XEMC, XFN, XLN, XEM, XSR, XSRC } from "./a_val.js";

const m_cntpnl = document.querySelector('.m-add-user-container');
const m_cntfrm = document.querySelector('.m-add-user-form');
const m_cnlbtn = document.querySelector('.m-add-user-cnlbtn');

m_cnlbtn.addEventListener('click', cls);

let tx, tx2;
function cls() {
    m_cntfrm.classList.remove('open');

    clearTimeout(tx);
    tx = setTimeout(() => {
        m_cntpnl.classList.remove('open');
    }, 550);
}

const xfni = document.getElementById('first-name');
const xlni = document.getElementById('last-name');
const xemi = document.getElementById('email');
const xsri = document.getElementById('select-role');

const m_crtbtn = document.querySelector('.m-add-user-crtbtn');
const xxer = document.querySelector('.m-add-user-err');

m_crtbtn.addEventListener('click', val);

function val() {
    console.log(`Result: ${XFNC && XLNC && XEMC && XSRC}`)
    if (XFNC && XLNC && XEMC && XSRC) {
        cdb();
    } else {
        xxer.textContent = "Please fill up the Form!";

        clearTimeout(tx2);
        tx2 = setTimeout(() => {
            xxer.textContent = "";
        }, 2500);
    }
}

async function cdb() {
    try {
        const cref = collection(db, "users");
        const querySnapshot = await getDocs(cref);
        let emx = false;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const NXM = XEM + "@gmail.com";


            if (NXM == data.email) {
                xxer.textContent = "Email Already Exists!";
                emx = true;

                clearTimeout(tx2);
                tx2 = setTimeout(() => {
                    xxer.textContent = "";
                }, 2500);
                return;
            }
        });

        if (!emx) {
            sdb();
            return;
        }

    } catch(err) {
        console.log("Error!", err);
    }
}

async function sdb() {
    const NXM = XEM + "@gmail.com";
    const NPW = (XFN + XLN).replace(/\s+/g, '').toLowerCase();

    const adx = {
        firstname: XFN,
        lastname: XLN,
        email: NXM,
        role: XSR,
        password: NPW,
        createdAt: new Date()
    }

    const ucref = collection(db, "users");

    addDoc(ucref, adx)
        .then(() => {
            createUserWithEmailAndPassword(auth, NXM, NPW)
            .then((user) => {
                let wpl = document.querySelector('.m-add-user-warning-pnl');
                let wrx = document.createElement('p');

                wrx.classList.add('m-add-user-warning-txt');
                wrx.textContent = "User Added Successfully!";

                wpl.appendChild(wrx);
                setTimeout(() => {
                    wpl.removeChild(wrx);
                }, 2500);

                rsf();
                return;
            })
        })
        .catch((error) => {
            xxer.textContent = "Error Occured!";

            clearTimeout(tx2);
            tx2 = setTimeout(() => {
                xxer.textContent = "";
            }, 2500);
        });
}

function rsf() {
    xfni.value = "";
    xlni.value = "";
    xemi.value = "";
    xsri.value = "";
}