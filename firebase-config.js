 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyC78WlSnpSA_dLEN7LfAWddkpC6d4envCE",
    authDomain: "personalbooktracker.firebaseapp.com",
    projectId: "personalbooktracker",
    storageBucket: "personalbooktracker.firebasestorage.app",
    messagingSenderId: "743231870133",
    appId: "1:743231870133:web:44fe02d2ac3c3fffe05afc",
    measurementId: "G-0R60EDWT53"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);

 