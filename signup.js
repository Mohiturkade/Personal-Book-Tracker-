import { auth } from "./firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const errorDiv = document.getElementById("signup-error");
  const successDiv = document.getElementById("signup-success");

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorDiv.textContent = "";
    successDiv.textContent = "";

    const fullName = signupForm["fullname"].value.trim();
    const email = signupForm["email"].value.trim();
    const password = signupForm["password"].value;
    const confirmPassword = signupForm["confirm-password"].value;

    if (password !== confirmPassword) {
      errorDiv.textContent = "Passwords do not match.";
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (fullName) {
        await updateProfile(user, {
          displayName: fullName
        });
      }

      successDiv.textContent = "Account created successfully! Redirecting to login...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  });
});
