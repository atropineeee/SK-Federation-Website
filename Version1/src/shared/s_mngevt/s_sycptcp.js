import { db, auth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithEmailAndPassword, signOut } from "../../firebase/cli.mjs";
import { getDatabase, rtdQuery, ref, child, get, set, push, update, remove, onChildAdded, onValue, orderByChild, limitToLast } from "../../firebase/cli.mjs";
import { getFirestore, collection, where, fsQuery, doc, addDoc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, onSnapshot } from "../../firebase/cli.mjs";

export async function sncptpc() {
    const tableBody = document.querySelector('.m-s-mng-event-tbl tbody');
    tableBody.innerHTML = "";
    
    const s_evtid = document.querySelector('.m-s-event-id-txt');
    let EVTID = s_evtid.textContent;
    
    const cref = collection(db, "events");
    const qr = fsQuery(cref, where('id', "==", EVTID));
    const querySnapshot = await getDocs(qr);

    if (!querySnapshot.empty) {
        let counter = 1;
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const participants = data.participants || [];
            participants.forEach((participant) => {
                const row = document.createElement('tr');
                if (participant.attended == "Not Yet") {
                    row.innerHTML = `
                        <td>${counter + ". " + participant.name}</td>
                        <td>${participant.occupation}</td>
                        <td>${participant.district}</td>
                        <td>${participant.role}</td>
                        <td>${participant.attended}</td>
                        <td>
                            <div class="m-s-mng-event-attd-btn" id="${participant.id}">
                                <i class="fa-solid fa-user-check"></i>
                            </div>
                        </td>
                    `;
                } else {
                    row.innerHTML = `
                        <td>${participant.title + ". " + participant.name}</td>
                        <td>${participant.occupation}</td>
                        <td>${participant.district}</td>
                        <td>${participant.role}</td>
                        <td>${participant.attended}</td>
                        <td>
                            <div class="m-s-mng-event-attd-done">
                                <i class="fa-solid fa-user-check"></i>
                            </div>
                        </td>
                    `;
                }

                tableBody.appendChild(row);
                counter++;
            });
        });
    }
}

document.body.addEventListener("click", function(event) {
    const btn = event.target.closest(".m-s-mng-event-attd-btn");
    if (btn) {
        const sid = btn.getAttribute("id");
        markAttendance(sid);
    }
});

async function markAttendance(id) {
    const s_evtid = document.querySelector('.m-s-event-id-txt');
    let EVTID = s_evtid.textContent.trim();
    const cref = collection(db, "events");
    const qr = fsQuery(cref, where("id", "==", EVTID));
    const querySnapshot = await getDocs(qr);

    if (!querySnapshot.empty) {
        const eventDocRef = querySnapshot.docs[0].ref;
        const eventDocSnap = await getDoc(eventDocRef);

        if (eventDocSnap.exists()) {
            let eventData = eventDocSnap.data();
            let participants = eventData.participants || [];

            const updatedParticipants = participants.map(participant => {
                if (participant.id === id) {
                    return { ...participant, attended: "Present" };
                }
                return participant;
            });
            await updateDoc(eventDocRef, { participants: updatedParticipants });
        }
    }
}

const updateEV = collection(db, "events");

const unsubscribe = onSnapshot(updateEV, (querySnapshot) => {
    if (!querySnapshot.empty) {
        sncptpc();
    }
});