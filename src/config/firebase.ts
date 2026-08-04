/**
 * Firebase Configuration for FamilyAI Hub Mobile Web
 */

export const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSy_FamilyAI_Hub_Mobile_DemoKey",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "familyai-hub-indonesia.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "familyai-hub-indonesia",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "familyai-hub-indonesia.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "491323103992",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:491323103992:web:familyaimobile01",
};

export const isFirebaseConfigured = Boolean(process.env.VITE_FIREBASE_API_KEY);
