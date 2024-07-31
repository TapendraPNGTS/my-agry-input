importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


const firebaseConfig = {
  apiKey: "AIzaSyB6ayhKXqC-Rgkf_60TfDcwUfjBdgMDmXs",
  authDomain: "khetimitra-57ce2.firebaseapp.com",
  projectId: "khetimitra-57ce2",
  storageBucket: "khetimitra-57ce2.appspot.com",
  messagingSenderId: "1083238598259",
  appId: "1:1083238598259:web:d83a5393baa59ae552cc06",
  measurementId: "G-YG07N45Y1Q"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
 
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
