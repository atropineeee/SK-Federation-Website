import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../../firebase/cli.mjs";

const s_evnmi = document.getElementById('event-name');
const s_evdli = document.getElementById('event-details');
const s_evddt = document.getElementById('event-date');
const s_evtti = document.getElementById('event-time');

const s_err = document.querySelector('.m-crt-event-err');

let EVNM, EVDL, EVDT, EVTM;
let EVNMG, EVDLG, EVDTG, EVTMG;
let tx;

s_evnmi.addEventListener('input', () => {
    snc();
    ckevnm();
    xcd();
});

s_evdli.addEventListener('input', () => {
    snc();
    ckevdl();
    xcd();
});

// DATE
s_evddt.addEventListener('input', () => {
    snc();
    ckevdt();
    xcd();
});

// TIME
s_evtti.addEventListener('input', () => {
    snc();
    ckevtm();
    xcd();
});

function snc() {
    EVNM = s_evnmi.value;
    EVDL = s_evdli.value;
    EVDT = s_evddt.value;
    EVTM = s_evtti.value;
}

function ckevnm() { 
    if (containsNumbersOrSymbols(EVNM)) {
        s_err.textContent = "Enter a Valid Event Name!";
        EVNMG = false;
    } else if (EVNM !== "") {
        s_err.textContent = "‎";
        EVNMG = true;
    } else {
        s_err.textContent = "Enter a Event Name!";
        EVNMG = false;
    }

    clearTimeout(tx);
    tx = setTimeout(() => {
        s_err.textContent = "‎"
    }, 2500);
}

function ckevdl() { 
    if (EVDL !== "") {
        s_err.textContent = "‎";
        EVDLG = true;
    } else {
        s_err.textContent = "Enter a Small Details!";
        EVDLG = false;
    }

    clearTimeout(tx);
    tx = setTimeout(() => {
        s_err.textContent = "‎"
    }, 2500);
}

// DATE
function ckevdt() { 
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);
    nextDay.setHours(0, 0, 0, 0);

    const selectedDate = new Date(EVDT);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
        s_err.textContent = "Enter a Valid Date!";
        EVDTG = false;
    } 
    else if (selectedDate <= nextDay) {
        s_err.textContent = "You cannot create an event for yesterday or today!";
        EVDTG = false;
    } else {
        s_err.textContent = "‎";
        EVDTG = true;
    }

    clearTimeout(tx);
    tx = setTimeout(() => {
        s_err.textContent = "‎"
    }, 2500);
}

// TIME
function ckevtm() { 
    if (EVTM !== "") {
        s_err.textContent = "‎";
        EVTMG = true;
    } else {
        s_err.textContent = "Enter a Valid Time!";
        EVTMG = false;
    }

    clearTimeout(tx);
    tx = setTimeout(() => {
        s_err.textContent = "‎"
    }, 2500);
}

const s_crtbtn = document.querySelector('.m-crt-event-btn');

function xcd () {
    if (EVNMG && EVDLG && EVTMG && EVDTG) {
        if (!s_crtbtn.classList.contains('open')) {
            s_crtbtn.classList.remove('close');
            s_crtbtn.classList.toggle('open');
        }
    } else if (s_crtbtn.classList.contains('open')) {
        s_crtbtn.classList.toggle('close');
        s_crtbtn.classList.remove('open');
    } else if (s_crtbtn.classList.contains('close')) {

    }
}


s_crtbtn.addEventListener('click', crvnt);

async function crvnt() {
    const ucref = collection(db, "events");

    const qs = fsQuery(ucref, where("name", "==", EVNM));
    const querySnapshot = await getDocs(qs);

    const EVID = EVNM.toLowerCase().replace(/\s+/g, '');

    if (!querySnapshot.empty) {
        const listDoc = querySnapshot.docs[0];
        const listData = listDoc.data();
        const evnmx = listData.name;

        if (EVNM == evnmx) {
            console.log("Event name already exists!");
        }

    } else {
        const adx = {
            name: EVNM,
            details: EVDL,
            date: EVDT,
            time: EVTM,
            id: EVID,
            createdAt: new Date()
        }
        
        addDoc(ucref, adx)
            .then(() => {
                s_crtbtn.classList.toggle('close');
                s_crtbtn.classList.remove('open');
                rsf();
                return;
            }).catch((error) => {
                s_err.textContent = "Error Occured!";

                console.log(error);
        
                clearTimeout(tx);
                tx = setTimeout(() => {
                    s_err.textContent = "‎";
                }, 2500);
            });
    }
}

function containsNumbersOrSymbols(str) 
{
    const regex = /[0-9!@#$%^&*()_+{}\[\]:;"'<>,.?~`\\|/]/;
    return regex.test(str);
}

function rsf() {
    s_evnmi.value = "";
    s_evdli.value = "";
    s_evddt.value = "";
    s_evtti.value = "";
}
