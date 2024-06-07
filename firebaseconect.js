// Importar los módulos de Firebase desde las URLs del CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCzY2h4HwfBTNuJ7w0kzdaV5CWn98hW6L0",
  authDomain: "salones-e2e70.firebaseapp.com",
  projectId: "salones-e2e70",
  storageBucket: "salones-e2e70.appspot.com",
  messagingSenderId: "1747658641",
  appId: "1:1747658641:web:22f3082e4a9062781c1c30"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export class ManageAccount {
  register(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Guardar datos del usuario en Firestore
        setDoc(doc(db, "users", user.uid), {
          email: email
        });
        window.location.href = "index.html";
        alert("Registro exitoso. Serás redirigido a la página de inicio.");
      })
      .catch((error) => {
        console.error(error.message);
        alert("Error al registrar: " + error.message);
      });
  }

  authenticate(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((_) => {
        window.location.href = "home.html"; // Cambiado a "home.html"
        alert("Has iniciado sesión correctamente. Serás redirigido a la página principal.");
      })
      .catch((error) => {
        console.error(error.message);
        alert("Error al iniciar sesión: " + error.message);
      });
  }

  signOut() {
    signOut(auth)
      .then((_) => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
