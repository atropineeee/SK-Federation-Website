import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion } from "../../firebase/cli.mjs";

export async function sncptpc() {
    const eventPanel = document.querySelector('.m-s-mng-event-pnl');

    eventPanel.innerHTML = "";

    const s_evtid = document.querySelector('.m-s-event-id-txt');
    let EVTID = s_evtid.textContent;
    const cref = collection(db, "events");
    const qr = fsQuery(cref, where('id', "==", EVTID));
    const querySnapshot = await getDocs(qr);

    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const participants = data.participants || [];
            participants.forEach((participant) => {
                const participantPanel = document.createElement("div");
                participantPanel.classList.add("m-s-mng-event-ptcp-pnl");

                const name = document.createElement("p");
                name.classList.add("m-s-mng-event-ptcp-nm");
                name.textContent = participant.title + ". " + participant.name;

                const occupation = document.createElement("p");
                occupation.classList.add("m-s-mng-event-ptcp-oc");
                occupation.textContent = participant.occupation;

                const district = document.createElement("p");
                district.classList.add("m-s-mng-event-ptcp-dc");
                district.textContent = participant.district;

                const role = document.createElement("p");
                role.classList.add("m-s-mng-event-ptcp-rl");
                role.textContent = participant.role;

                const attd = document.createElement("p");
                attd.classList.add("m-s-mng-event-ptcp-attd");
                attd.textContent = participant.attended;

                const attendedButton = document.createElement("div");
                attendedButton.classList.add("m-s-mng-event-attd-btn");
                attendedButton.id = participant.id;

                const attendedIcon = document.createElement("i");
                attendedIcon.classList.add("fa-solid", "fa-user-check");

                attendedButton.appendChild(attendedIcon);

                participantPanel.appendChild(name);
                participantPanel.appendChild(occupation);
                participantPanel.appendChild(district);
                participantPanel.appendChild(role);
                participantPanel.appendChild(attd);
                participantPanel.appendChild(attendedButton);

                eventPanel.appendChild(participantPanel);
            });
        });
    }
}

sncptpc();