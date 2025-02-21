// Import necessary functions from the Firebase v9+ modular SDK
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';  // For Firebase Authentication with persistence
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for persistence
import { getFirestore } from 'firebase/firestore';  // For Firestore (if needed)
import { getStorage } from 'firebase/storage'; // For Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCJRHB6wERa2YThfPukmy_NxQjedMAuP3k",
  authDomain: "uniconnect-b8413.firebaseapp.com",
  projectId: "uniconnect-b8413",
  storageBucket: "uniconnect-b8413.appspot.com", // Corrected storageBucket format
  messagingSenderId: "488745741487",
  appId: "1:488745741487:web:8e4d16f3b7695a511e385a",
  measurementId: "G-ST347GLYNF"
};

// Initialize Firebase app if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize other Firebase services
const firestore = getFirestore(app);  // Firestore
const storage = getStorage(app);      // Firebase Storage

// Export initialized services
export { auth, firestore, storage };
export default app;
