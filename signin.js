import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDewnlmrqgHffKSID_XtQRTc7aTRRDloic",
    authDomain: "my-eventswhatsup.firebaseapp.com",
    projectId: "my-eventswhatsup",
    storageBucket: "my-eventswhatsup.firebasestorage.app",
    messagingSenderId: "82839194346",
    appId: "1:82839194346:web:a4813a773ee5396dd26593",
    measurementId: "G-5ZZ236N3BE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
let auth = getAuth(app);

loginBtn.addEventListener('click', async (userCredential) => {

    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    authErrorMessage.textContent = ''; // Clear previous errors
    let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let passWordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (email === "" && password === "") {
            authErrorMessage.textContent = `Email and Password can not be empty.`
            if (emailRegex.test(email.value) && passWordRegex.test(password.value)) {
                authErrorMessage.textContent = "Valid Email or Password";
                authErrorMessage.style.color = green;

            } else {
                authErrorMessage.textContent = "inValid Email or Password";
                authErrorMessage.style.color = red;
            }
        } else {
            alert("Login Successful")
        }
       
    } catch (error) {
        console.error("Login error:", error.message);
        authErrorMessage.textContent = `Login Failed: ${error.message.replace('Firebase:', '').trim()}`;
    }

});