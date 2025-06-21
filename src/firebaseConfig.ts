// frontend/src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase copiada y pegada aquí:
const firebaseConfig = {
  apiKey: "AIzaSyDf7xxxxx",
  authDomain: "cogent-58e64.firebaseapp.com",
  projectId: "cogent-58e64",
  storageBucket: "cogent-58e64.appspot.com",
  messagingSenderId: "672112345678",
  appId: "1:672112345678:web:abcd1234ef5678"
};

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
