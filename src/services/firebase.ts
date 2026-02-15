// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using environment variables with fallbacks
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "demo-auth-domain.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "demo-project-id.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456789",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-ABCDEFGHIJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with error handling
export const db = (() => {
  try {
    return getFirestore(app);
  } catch (error) {
    console.warn("Firebase initialization failed:", error);
    // Return a mock object for build time
    return null as any;
  }
})();
