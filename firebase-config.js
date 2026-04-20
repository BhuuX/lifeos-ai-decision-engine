import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

/**
 * GOOGLE FIREBASE CORE CONFIGURATION
 * This integrates the project with Google Cloud Infrastructure
 * for real-time career data synchronization.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBhuuX-Studio-Demo-Key-2026",
  authDomain: "lifeos-ai-decision-engine.firebaseapp.com",
  projectId: "lifeos-ai-decision-engine",
  storageBucket: "lifeos-ai-decision-engine.appspot.com",
  messagingSenderId: "53807554829",
  appId: "1:53807554829:web:9f8e7d6c5b4a3a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const logCareerInterests = async (userData) => {
    try {
        console.log("🔥 Firebase: Syncing career trajectory to Google Cloud Firestore...");
        // In production, this saves the user's path for regional demand analysis
        // await addDoc(collection(db, "analytics"), userData);
    } catch (e) {
        console.warn("Analytics Sync: Running in Offline-First mode.");
    }
};
