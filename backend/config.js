// Import necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import dotenv from 'dotenv';

dotenv.config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase Authentication instance
const auth = getAuth(app);

// Enable Firebase Authentication persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Authentication persistence enabled");
  })
  .catch((error) => {
    console.error("Error enabling Firebase Authentication persistence:", error);
  });

// Initialize Firebase Authentication and check user authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log("User is logged in. UID:", uid);
    // Here you can navigate to a logged-in user's dashboard or perform any other actions
  } else {
    console.log("No user is logged in.");
    // Here you can navigate to the login screen or perform any other actions
  }
});

export default auth;
