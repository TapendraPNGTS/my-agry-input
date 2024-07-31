import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyB6ayhKXqC-Rgkf_60TfDcwUfjBdgMDmXs",
  authDomain: "khetimitra-57ce2.firebaseapp.com",
  projectId: "khetimitra-57ce2",
  storageBucket: "khetimitra-57ce2.appspot.com",
  messagingSenderId: "1083238598259",
  appId: "1:1083238598259:web:d83a5393baa59ae552cc06",
  measurementId: "G-YG07N45Y1Q"
};


export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
