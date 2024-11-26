// Select form elements by their IDs
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.getElementById('remember-me');
const forgotPasswordLink = document.getElementById('forgot-password-link');
const registerLink = document.getElementById('register-link');
const loginButton = document.getElementById('login-button');

// Utility function to validate inputs
function validateInputs() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username) {
        alert('Please enter your username.');
        return false;
    }

    if (!password) {
        alert('Please enter your password.');
        return false;
    }

    return { username, password };
}

// Function to handle form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission
    const validationResult = validateInputs();

    if (validationResult) {
        const { username, password } = validationResult;
        console.log('Login data:', { username, password, rememberMe: rememberCheckbox.checked });

        // Simulate a successful login
        alert(`Welcome, ${username}!`);
        clearForm();
    }
}

// Function to clear the form after successful login
function clearForm() {
    usernameInput.value = '';
    passwordInput.value = '';
    rememberCheckbox.checked = false;
}

// Event listener for "Forgot Password" link
forgotPasswordLink.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Forgot password functionality is currently unavailable.');
});

// Event listener for "Register" link
registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Redirecting to the registration page...');
    // Simulate redirection (replace with actual link in production)
    console.log('Redirecting to registration...');
});

// Event listener for form submission
loginForm.addEventListener('submit', handleLogin);

// Optional: Log checkbox status when toggled
rememberCheckbox.addEventListener('change', () => {
    if (rememberCheckbox.checked) {
        console.log('Remember me selected');
    } else {
        console.log('Remember me deselected');
    }
});