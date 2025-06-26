// frontend/src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase copiada y pegada aquí:
const firebaseConfig = {
  apiKey: "AIzaSyAJtQDBJPV3VK4ko3jbjWxPVUIDgO2jB9s",
  authDomain: "cogent-58e64.firebaseapp.com",
  databaseURL: "https://cogent-58e64-default-rtdb.firebaseio.com",
  projectId: "cogent-58e64",
  storageBucket: "cogent-58e64.firebasestorage.app",
  messagingSenderId: "626852020152",
  appId: "1:626852020152:web:36729b3dfbdff857b6994d",
  measurementId: "G-FBV0W6MEB7"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa Firestore
const db = getFirestore(app);

export { app, db };
