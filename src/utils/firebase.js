import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWSY-DvNB6GPnAY4MRuNAQ1sSd_aunPd8",
    authDomain: "lets-connect-4515c.firebaseapp.com",
    projectId: "lets-connect-4515c",
    storageBucket: "lets-connect-4515c.appspot.com",
    messagingSenderId: "430324707760",
    appId: "1:430324707760:web:b26ae5a247452edf09a675",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Register the service worker
navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(() => {
        console.log("Service Worker registered");
    })
    .catch((error) => {
        console.error("Service Worker registration failed:", error);
    });

export { messaging, getToken, onMessage };
