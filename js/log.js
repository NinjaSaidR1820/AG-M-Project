// Default users for initial setup
const defaultUsers = [
    { username: "Admin", email: "admin@hotmail.com", password: "Admin123" },
    { username: "Cliente", email: "cliente@hotmail.com", password: "Cliente123" }
];

// Initialize localStorage with default users if not already set
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Function to clear form fields
function clearForm(formId) {
    document.getElementById(formId).reset();
}

// Handle switching between panels (Sign up, Sign in, Reset password)
document.getElementById('switchToSignUp').addEventListener('click', () => {
    document.getElementById('container').classList.add('right-panel-active');
    document.getElementById('container').classList.remove('reset-panel-active');
    clearForm('signInForm');
    clearForm('resetPasswordForm');
});

document.getElementById('switchToSignIn').addEventListener('click', () => {
    document.getElementById('container').classList.remove('right-panel-active');
    document.getElementById('container').classList.remove('reset-panel-active');
    clearForm('signUpForm');
    clearForm('resetPasswordForm');
});

document.getElementById('switchToResetPassword').addEventListener('click', () => {
    document.getElementById('container').classList.add('reset-panel-active');
    document.getElementById('container').classList.remove('right-panel-active');
    clearForm('signInForm');
    clearForm('signUpForm');
});

document.getElementById('switchToSignInFromReset').addEventListener('click', () => {
    document.getElementById('container').classList.remove('reset-panel-active');
    clearForm('resetPasswordForm');
});

// Function to toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const passwordIcon = document.getElementById(`${inputId}Icon`);

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}

// Handle sign up form submission
document.getElementById('signUpForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('signUpUsername').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    // Fetch existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username or email already exists
    const existingUser = users.find(user => user.username === username || user.email === email);

    if (existingUser) {
        Swal.fire({
            icon: 'error',
            title: 'Usuario existente',
            text: 'El usuario o el correo electrónico ya está registrado.'
        });
    } else {
        // Add new user to the list
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Su cuenta ha sido creada exitosamente.'
        }).then(() => {
            document.getElementById('switchToSignIn').click(); // Switch to sign in panel
        });
    }

    clearForm('signUpForm');
});

// Handle sign in form submission
document.getElementById('signInForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('signInUsername').value;
    const password = document.getElementById('signInPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: `Bienvenido, ${username}!`
        }).then(() => {
            // Redirect or perform any other action after successful login
            // For demo purposes, let's switch to the home page
            window.location.href = '/index.html'; // Replace with your actual home page URL
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Inicio de sesión fallido',
            text: 'Nombre de usuario o contraseña incorrectos.'
        });
    }

    clearForm('signInForm');
});

// Handle reset password form submission
document.getElementById('resetPasswordForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('resetPasswordEmail').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (user) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `Se ha enviado un enlace para restablecer tu contraseña a ${email}`
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró ningún usuario con este correo electrónico.'
        });
    }

    clearForm('resetPasswordForm');
});


