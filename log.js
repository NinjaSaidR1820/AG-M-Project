document.getElementById('switchToSignUp').addEventListener('click', () => {
    document.getElementById('container').classList.add('right-panel-active');
    document.getElementById('container').classList.remove('reset-panel-active');
});

document.getElementById('switchToSignIn').addEventListener('click', () => {
    document.getElementById('container').classList.remove('right-panel-active');
    document.getElementById('container').classList.remove('reset-panel-active');
});

document.getElementById('switchToResetPassword').addEventListener('click', () => {
    document.getElementById('container').classList.add('reset-panel-active');
    document.getElementById('container').classList.remove('right-panel-active');
});

document.getElementById('switchToSignInFromReset').addEventListener('click', () => {
    document.getElementById('container').classList.remove('reset-panel-active');
});

document.getElementById('resetPasswordForm').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Se ha enviado un enlace para restablecer tu contraseña');
});

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}
