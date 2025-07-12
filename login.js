import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const errorDiv = document.getElementById("login-error");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.textContent = "";

    const email = loginForm["email"].value.trim();
    const password = loginForm["password"].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "dashboard.html";
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});

