import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, setDoc, updateDoc, deleteDoc } from "../../firebase/cli.mjs";

import { sncptpc } from "./s_sycptcp.js";

export async function sncevt() {
    const cref = collection(db, "events");
    const querySnapshot = await getDocs(cref);
    const holder = document.querySelector('.m-mng-event-pnl');
    
    holder.innerHTML = "";
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const evnm = data.name;
        const evdl = data.details;
        const evdt = data.date;
        const evid = data.id;
        const evtm = convertTo12Hour(data.time);

        const eventContainer = document.createElement("div");
        eventContainer.classList.add("m-mng-event-c");

        const eventName = document.createElement("p");
        eventName.classList.add("m-mng-evnt-nm");
        eventName.textContent = evnm;

        const eventDetails = document.createElement("p");
        eventDetails.classList.add("m-mng-evnt-dl");
        eventDetails.textContent = evdl;

        const eventDate = document.createElement("p");
        eventDate.classList.add("m-mng-evnt-dtm");
        eventDate.textContent = `${evdt} - ${evtm}`;

        const manageBtn = document.createElement("div");
        manageBtn.classList.add("m-mng-evnt-btn");
        manageBtn.id = evid;

        const manageText = document.createElement("p");
        manageText.classList.add("m-mng-evnt-btn-txt");
        manageText.textContent = "Manage";

        const manageIcon = document.createElement("i");
        manageIcon.classList.add("fa-solid", "fa-pencil");

        manageBtn.appendChild(manageText);
        manageBtn.appendChild(manageIcon);

        manageBtn.onclick = function() {
            opnMngr(evnm, evid);
        }

        eventContainer.appendChild(eventName);
        eventContainer.appendChild(eventDetails);
        eventContainer.appendChild(eventDate);
        eventContainer.appendChild(manageBtn);

        holder.append(eventContainer);
    });
}

function opnMngr(evnm, evid) {
    const spnl = document.querySelector('.m-mng-event-container');
    const pnl = document.querySelector('.m-s-mng-event-ctn');
    spnl.classList.remove('open');
    pnl.classList.add('open');

    const evs = document.querySelector('.m-s-event-id-txt');
    const evss = document.querySelector('.m-s-event-nm-txt');
    evs.textContent = evid;
    evss.textContent = evnm;

    sncptpc();
}

function convertTo12Hour(time) {
    let [hours, minutes] = time.split(":").map(Number);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

sncevt();
