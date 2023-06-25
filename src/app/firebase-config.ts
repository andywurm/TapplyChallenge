import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyAO2MmNsUHyrPSoz4iGLCZ_rIMm3hxUFPQ",
    authDomain: "tapplychallenge.firebaseapp.com",
    projectId: "tapplychallenge",
    storageBucket: "tapplychallenge.appspot.com",
    messagingSenderId: "70023148545",
    appId: "1:70023148545:web:42c0153ecaf5f2ac343c00",
    measurementId: "G-YNDLWQ2Q87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
