importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyBWSY-DvNB6GPnAY4MRuNAQ1sSd_aunPd8",
    authDomain: "lets-connect-4515c.firebaseapp.com",
    projectId: "lets-connect-4515c",
    storageBucket: "lets-connect-4515c.appspot.com",
    messagingSenderId: "430324707760",
    appId: "1:430324707760:web:b26ae5a247452edf09a675",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
