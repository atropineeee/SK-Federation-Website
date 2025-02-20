import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from "../../firebase/cli.mjs";
import { sncptpc } from "./s_sycptcp.js";


const s_mngpnl = document.querySelector('.m-s-mng-event-s-container');
const s_cnlbtn = document.querySelector('.m-s-mng-event-cnlbtn');
const s_addbtn = document.querySelector('.m-s-mng-event-addbtn');

const s_addptc = document.querySelector('.m-s-event-add-ptcp-btn');
const s_errid = document.querySelector('.m-s-mng-event-s-err');

const s_ttlin = document.getElementById('select-title');
const s_ptpnm = document.getElementById('participant-name');
const s_ptpps = document.getElementById('participant-position');
const s_ptpds = document.getElementById('select-district');
const s_ptpct = document.getElementById('select-vip');

s_addptc.addEventListener('click', opnfnc);
s_cnlbtn.addEventListener('click', cnlfnc);
s_addbtn.addEventListener('click', addfnc);

let PTCTL, PTCNM, PTCPS, PTCDS, PTCCT, EVTID;

function opnfnc() {
    s_mngpnl.classList.add('open');
}

function cnlfnc() {
    s_mngpnl.classList.remove('open');
    sncptpc();
}

async function addfnc() {
    const s_evtid = document.querySelector('.m-s-event-id-txt');
    PTCTL = s_ttlin.value;
    PTCNM = s_ptpnm.value;
    PTCPS = s_ptpps.value;
    PTCDS = s_ptpds.value;
    PTCCT = s_ptpct.value;
    EVTID = s_evtid.textContent;

    if (PTCTL == "") { 
        s_errid.textContent = "Select Participant's Title";
        return;
    } 

    if (PTCNM == "") {
        s_errid.textContent = "Enter Participant's Name";
        return;
    }

    const cref = collection(db, "events");
    const qr = fsQuery(cref, where("id", "==", EVTID));
    const querySnapshot = await getDocs(qr);

    if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        const docSnap = await getDoc(docRef);
        const existingParticipants = docSnap.data().participants || [];

        let participantID;
        do {
            participantID = generateUniqueID();
        } while (existingParticipants.some(p => p.id === participantID))

        const newParticipant = {
            id: participantID,
            title: PTCTL,
            name: PTCNM,
            occupation: PTCPS,
            district: PTCDS,
            role: PTCCT,
            attended: "Not Yet"
        };

        try {
            await updateDoc(docRef, {
                participants: arrayUnion(newParticipant)
            });
            reset();
        } catch (error) {
            s_errid.textContent = "Error Adding Participant";
            console.log(error);
        }
    } else {
        s_errid.textContent = "Cannot find Event ID";
    }
}

function generateUniqueID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: 10 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
}

function reset() {
    s_ttlin.value = "";
    s_ptpnm.value = "";
    s_ptpps.value = "";
    s_ptpds.value = "";
    s_ptpct.value = "";
}
