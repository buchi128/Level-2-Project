const firstName = document.getElementById('firstName');
const secondName = document.getElementById('secondName');
const signupEmailInput = document.getElementById('signup-email');
const signupUsernameInput = document.getElementById('signup-username');
const signupPasswordInput = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const authErrorMessage = document.getElementById('auth-error-message');
const showLoginLink = document.getElementById('show-login');
const showSignupLink = document.getElementById('show-signup');
const signupModeDiv = document.getElementById('signup-mode');
const loginModeDiv = document.getElementById('login-mode');
console.log(firstName,secondName,signupEmailInput,signupUsernameInput,signupPasswordInput,signupBtn,loginEmailInput, loginPasswordInput);
showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModeDiv.style.display = 'none';
    loginModeDiv.style.display = 'block';
    authErrorMessage.textContent = ''; // Clear message on switch
});

showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupModeDiv.style.display = 'block';
    loginModeDiv.style.display = 'none';
    authErrorMessage.textContent = ''; // Clear message on switch
});

signupBtn.addEventListener('click', async () => {
    const email = signupEmailInput.value;
    const password = signupPasswordInput.value;
    const username = signupUsernameInput.value;
    
  //  const imageFile = document.getElementById('signup-picture').files[0];

    authErrorMessage.textContent = ''; // Clear previous errors
    let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let passWordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

    
    if (!username) {
         authErrorMessage.textContent = "Username is required.";
        return;
    }
    if(emailRegex.test(email.value) && passWordRegex.test(password.value)){
         authErrorMessage.textContent = "Valid Email or Password";
          authErrorMessage.style.color = green;
        
    }else{
         authErrorMessage.textContent = "inValid Email or Password";
          authErrorMessage.style.color = red;
    }
    

    try {
      //  const auth = "app";
        // 1. Create User with Email and Password
         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        let profilePictureUrl = 'default-avatar.png';

        // 2. Handle Picture Upload (Using Firebase Storage)
        if (imageFile) {
            const storageRef = storage.ref(`profile_pictures/${user.uid}/${imageFile.name}`);
            const uploadTask = await storageRef.put(imageFile);
            profilePictureUrl = await uploadTask.ref.getDownloadURL();
        }

        // 3. Save Custom Profile Data to Firestore
        await db.collection('users').doc(user.uid).set({
            email: email,
            username: username,
            profilePictureUrl: profilePictureUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("User signed up and profile saved.");
        alert(`Welcome, ${username}! You are now signed in.`);

    } catch (error) {

        console.error("Sign up error:", error.message);
        authErrorMessage.textContent = `Sign Up Failed: ${error.message.replace('An Error Occured:', '').trim()}`;
    }
});


