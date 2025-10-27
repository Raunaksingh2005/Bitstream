// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleBtn = event.currentTarget;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" stroke-width="2"/>
                <path d="M1 1l22 22" stroke="currentColor" stroke-width="2"/>
            </svg>
        `;
    } else {
        passwordInput.type = 'password';
        toggleBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" stroke="currentColor" stroke-width="2"/>
                ircle cx="12" cy="12" r="3" stroke="currentColor" stroke-e-width="2"/>
            </svg>
        `;
    }
}

// Password strength checker
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthDiv = document.getElementById('passwordStrength');
    
    if (password.length === 0) {
        strengthDiv.textContent = '';
        return;
    }
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 1) {
        strengthDiv.textContent = '⚠️ Weak password';
        strengthDiv.style.color = '#ef4444';
    } else if (strength === 2 || strength === 3) {
        strengthDiv.textContent = '⚡ Good password';
        strengthDiv.style.color = '#f5b942';
    } else {
        strengthDiv.textContent = '✅ Strong password';
        strengthDiv.style.color = '#22c55e';
    }
});

// Form submission
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    if (!fullName || !email || !username || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Please accept the terms and conditions', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    // Simulate signup process
    const btn = document.querySelector('.btn-primary');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'Creating account...';
    btn.disabled = true;
    
    setTimeout(() => {
        const userData = {
            fullName: fullName,
            email: email,
            username: username
        };
        
        localStorage.setItem('bitstreamUser', email);
        localStorage.setItem('bitstreamUserData', JSON.stringify(userData));
        
        showNotification('Account created successfully!', 'success');
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }, 2000);
});

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add slide in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);