// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleBtn = event.currentTarget;
    const icon = toggleBtn.querySelector('i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Password strength checker
const passwordInput = document.getElementById('password');
const strengthIndicator = document.getElementById('passwordStrength');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    
    // Clear indicator if password is empty
    if (password.length === 0) {
        strengthIndicator.textContent = '';
        strengthIndicator.className = 'password-strength';
        return;
    }
    
    // Calculate password strength
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Display strength
    if (strength <= 2) {
        strengthIndicator.textContent = '⚠️ Weak password';
        strengthIndicator.className = 'password-strength weak';
    } else if (strength <= 3) {
        strengthIndicator.textContent = '⚡ Medium password';
        strengthIndicator.className = 'password-strength medium';
    } else {
        strengthIndicator.textContent = '✅ Strong password';
        strengthIndicator.className = 'password-strength strong';
    }
});

// Form submission handler
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    // Validation checks
    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!terms) {
        alert('Please accept the Terms & Conditions');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Username validation (alphanumeric and underscore only)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        alert('Username can only contain letters, numbers, and underscores');
        return;
    }
    
    // Store user data in localStorage
    const userData = {
        fullName: fullName,
        email: email,
        username: username,
        bio: 'New Bitstream user',
        joinedDate: new Date().toLocaleDateString()
    };
    
    localStorage.setItem('bitstreamUserData', JSON.stringify(userData));
    localStorage.setItem('bitstreamUser', email);
    
    // Show success message
    alert('Account created successfully! Redirecting to login...');
    
    // Redirect to login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
});

// Real-time password match validation
document.getElementById('confirmPassword').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = this.value;
    
    if (confirmPassword && password !== confirmPassword) {
        this.style.borderColor = '#ef4444';
    } else if (confirmPassword && password === confirmPassword) {
        this.style.borderColor = '#22c55e';
    } else {
        this.style.borderColor = '#e2e8f0';
    }
});