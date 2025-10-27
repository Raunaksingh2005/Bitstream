
window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('bitstreamUser');
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    loadSettings();
});


function loadSettings() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData')) || {};
    const privacySettings = JSON.parse(localStorage.getItem('privacySettings')) || {};
    
   
    document.getElementById('displayName').value = userData.fullName || '';
    document.getElementById('username').value = userData.username || '';
    document.getElementById('email').value = userData.email || '';
    document.getElementById('bio').value = userData.bio || '';
    
    
    document.getElementById('publicProfile').checked = privacySettings.publicProfile !== false;
    document.getElementById('allowMessages').checked = privacySettings.allowMessages || false;
    document.getElementById('showActivity').checked = privacySettings.showActivity !== false;
    document.getElementById('emailNotifications').checked = privacySettings.emailNotifications !== false;
    document.getElementById('pushNotifications').checked = privacySettings.pushNotifications !== false;
    document.getElementById('postInteractions').checked = privacySettings.postInteractions !== false;
    document.getElementById('newFollowers').checked = privacySettings.newFollowers !== false;
}


document.getElementById('accountForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const displayName = document.getElementById('displayName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const bio = document.getElementById('bio').value.trim();
    
    if (!displayName || !username || !email) {
        showNotification('Please fill in all required fields', 'error');
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
    
    showNotification('Account settings saved successfully!', 'success');
});


document.querySelectorAll('.toggle input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const privacySettings = {
            publicProfile: document.getElementById('publicProfile').checked,
            allowMessages: document.getElementById('allowMessages').checked,
            showActivity: document.getElementById('showActivity').checked,
            emailNotifications: document.getElementById('emailNotifications').checked,
            pushNotifications: document.getElementById('pushNotifications').checked,
            postInteractions: document.getElementById('postInteractions').checked,
            newFollowers: document.getElementById('newFollowers').checked
        };
        
        localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
        showNotification('Privacy settings updated!', 'success');
    });
});


function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    showNotification(`Switched to ${isLight ? 'light' : 'dark'} mode!`, 'success');
}


function deleteAccount() {
    const confirmation = prompt('This action cannot be undone. Type "DELETE" to confirm:');
    
    if (confirmation === 'DELETE') {
        
        localStorage.clear();
        alert('Your account has been deleted successfully.');
        window.location.href = 'index.html';
    } else if (confirmation !== null) {
        showNotification('Account deletion cancelled', 'error');
    }
}


function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('bitstreamUser');
        window.location.href = 'login.html';
    }
}


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
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(style);


window.addEventListener('DOMContentLoaded', function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('light-mode');
    }
});