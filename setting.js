window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('bitstreamUser');
    
    
    loadSettings();
});

function loadSettings() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData')) || {};
    const settings = JSON.parse(localStorage.getItem('bitstreamSettings')) || {};
    
    document.getElementById('displayName').value = userData.fullName || '';
    document.getElementById('username').value = userData.username || '';
    document.getElementById('email').value = userData.email || '';
    document.getElementById('bio').value = userData.bio || '';
    
    document.getElementById('publicProfile').checked = settings.publicProfile !== false;
    document.getElementById('allowMessages').checked = settings.allowMessages || false;
    document.getElementById('showActivity').checked = settings.showActivity !== false;
    document.getElementById('emailNotif').checked = settings.emailNotif !== false;
    document.getElementById('pushNotif').checked = settings.pushNotif !== false;
    document.getElementById('followerNotif').checked = settings.followerNotif !== false;
}

document.getElementById('accountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const displayName = document.getElementById('displayName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();
    
    if (!displayName || !username || !email) {
        alert('Please fill in all required fields');
        return;
    }
    
    const userData = {
        fullName: displayName,
        username: username,
        email: email,
        bio: bio
    };
    
    localStorage.setItem('bitstreamUserData', JSON.stringify(userData));
    localStorage.setItem('bitstreamUser', email);
    
    showNotification('Account settings saved successfully!');
});

document.querySelectorAll('.toggle input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const settings = {
            publicProfile: document.getElementById('publicProfile').checked,
            allowMessages: document.getElementById('allowMessages').checked,
            showActivity: document.getElementById('showActivity').checked,
            emailNotif: document.getElementById('emailNotif').checked,
            pushNotif: document.getElementById('pushNotif').checked,
            followerNotif: document.getElementById('followerNotif').checked
        };
        
        localStorage.setItem('bitstreamSettings', JSON.stringify(settings));
        showNotification('Privacy settings updated!');
    });
});

function deleteAccount() {
    const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        localStorage.clear();
        alert('Your account has been deleted successfully.');
        window.location.href = 'index.html';
    } else if (confirmation !== null) {
        alert('Account deletion cancelled');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('bitstreamUser');
        window.location.href = 'login.html';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: #22c55e;
        color: white;
        border-radius: 0.75rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);
