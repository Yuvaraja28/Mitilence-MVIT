import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Initialize Firebase
export const fireApp = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API || "{}"));

// Initialize Firebase App Check ONLY in the client (browser)
if (typeof window !== "undefined") {
  initializeAppCheck(fireApp, {
    provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''),
    isTokenAutoRefreshEnabled: true
  });
}

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