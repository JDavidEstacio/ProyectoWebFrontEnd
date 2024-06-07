// Import ManageAccount class from firebaseconect.js
import { ManageAccount } from './firebaseconect.js';
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

document.getElementById("formulario-sesion").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("txt-email").value; // Captura el correo electrónico ingresado por el usuario
  const password = document.getElementById("txt-password").value;

  const account = new ManageAccount();
  account.authenticate(email, password);
});

document.getElementById("forgot-password-link").addEventListener("click", () => {
  const email = prompt("Introduce tu correo electrónico:");
  if (email) {
    const auth = getAuth(); // Importa getAuth aquí
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Se ha enviado un correo electrónico para restablecer la contraseña a: ', email);
        alert(`Se ha enviado un correo electrónico para restablecer la contraseña a: ${email}`);
      })
      .catch((error) => {
        console.error('Error al enviar el correo electrónico:', error.message);
        alert(`Error al enviar el correo electrónico: ${error.message}`);
      });
  }
});

console.log('Formulario de Inicio de Sesión');
