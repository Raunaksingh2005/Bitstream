function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    if (!username || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    

    localStorage.setItem('bitstreamUser', username);
    if (remember) {
        localStorage.setItem('rememberMe', 'true');
    }
    

    window.location.href = 'profile.html';
});

window.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedUser = localStorage.getItem('bitstreamUser');
        if (savedUser) {
            document.getElementById('username').value = savedUser;
            document.getElementById('remember').checked = true;
        }
    }
});