import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAdL9nDk4Ql8ieFHef3johCIwmqykLSOOE",
    authDomain: "chickcheck-5a2dc.firebaseapp.com",
    databaseURL: "https://chickcheck-5a2dc-default-rtdb.firebaseio.com",
    projectId: "chickcheck-5a2dc",
    storageBucket: "chickcheck-5a2dc.firebasestorage.app",
    messagingSenderId: "159804512638",
    appId: "1:159804512638:web:a3174ee498924233c2fb2f",
    measurementId: "G-X76CQ58W95",
    databaseURL: "https://chickcheck-5a2dc-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);