import axios from "axios";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, onChildChanged, onValue, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAdL9nDk4Ql8ieFHef3johCIwmqykLSOOE",
    authDomain: "chickcheck-5a2dc.firebaseapp.com",
    databaseURL: "https://chickcheck-5a2dc-default-rtdb.firebaseio.com",
    projectId: "chickcheck-5a2dc",
    storageBucket: "chickcheck-5a2dc.firebasestorage.app",
    messagingSenderId: "159804512638",
    appId: "1:159804512638:web:a3174ee498924233c2fb2f",
    measurementId: "G-X76CQ58W95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase();

let pushToken = "";
const pushTokenRef = ref(db, "pushToken");
onValue(pushTokenRef, (data) => {
    console.log("pushToken");
    console.log(data.val());
    pushToken = data.val();
})

// Function to send notification
const sendNotification = async (message, icon, groupId) => {
    try {
        const response = await axios.post(
            "https://exp.host/--/api/v2/push/send", // Replace with your notification service URL
            {
                to: pushToken, // Replace with the recipient token
                title: `${icon} ${groupId} DANGER`,
                body: message,
            },
            {
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        console.log("Notification sent:", response.data);
    } catch (error) {
        console.error("Error sending notification:", error.response?.data || error.message);
    }
};

const listenToTemp = () => {
    const tempRef = ref(db, "temperature");

    onValue(tempRef, (snapshot) => {
        console.log("changed")
        const data = snapshot.val();
        if (data && data >= 25) {
            console.log("Threshold exceeded:", data);
            sendNotification(`Temperature: ${data}°, please open the windows`, '🌡️', 'Temperature');
        } else if (data && data <= 18) {
            sendNotification(`Temperature: ${data}°, please turn the heater on`, '🌡️', 'Temperature');
        }
    });
};

const listenToAmonia = () => {
    const amoniaRef = ref(db, "ammonia");

    onValue(amoniaRef, (snapshot) => {
        console.log("changed")
        const data = snapshot.val();
        if (data && (data >= 2.5)) {
            console.log("Threshold exceeded:", data);
            sendNotification(`Ammonia: ${data}ppm, clean the coop and open the windows for fresh air`, '🫧', 'Ammonia');
        }
    });
};

// Start listening
listenToAmonia();
listenToTemp();
