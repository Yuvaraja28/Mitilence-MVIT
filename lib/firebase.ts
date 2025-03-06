import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
import { getAnalytics, isSupported } from "firebase/analytics";

// Initialize Firebase
export const fireApp = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API || "{}"));

// Auth
export const fireAuth = getAuth(fireApp);
fireAuth.languageCode = 'en';

// Firestore
export const firestoreDB = getFirestore(fireApp);

// Realtime DB
export const realtimeDB = getDatabase(fireApp)

// Analytics (Check if supported)
export let fireAnalytics: any;
isSupported()
  .then((supported) => {
    if (supported) {
      fireAnalytics = getAnalytics(fireApp);
    }
  })
  .catch((error) => console.error("Analytics not supported", error));