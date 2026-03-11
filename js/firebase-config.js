// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmcJb5bSPGfBrcuexuPRiv37GIqpzHmLQ",
  authDomain: "leadbryte-solutions-website.firebaseapp.com",
  projectId: "leadbryte-solutions-website",
  storageBucket: "leadbryte-solutions-website.firebasestorage.app",
  messagingSenderId: "418567681709",
  appId: "1:418567681709:web:991fd66c8ef646e1d53824",
  measurementId: "G-KP9278VC0D"
};

// Initialize Firebase using CDN imports for browser support
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db, collection, addDoc, serverTimestamp, analytics };
