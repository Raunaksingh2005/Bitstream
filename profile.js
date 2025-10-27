window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('bitstreamUser');
    
    loadProfileData();
    loadUserPosts();
});

function loadProfileData() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    if (userData) {
        document.getElementById('profileName').textContent = userData.fullName || 'User Name';
        document.getElementById('profileUsername').textContent = '@' + (userData.username || 'username');
        if (userData.bio) {
            document.getElementById('profileBio').textContent = userData.bio;
        }
    }
}

const userPosts = [
    {
        content: 'Just completed my Front End Engineering project! Excited to present Bitstream 🚀',
        time: '2h ago'
    },
    {
        content: 'Working on amazing web designs today. CSS animations are incredible! ✨',
        time: '5h ago'
    },
    {
        content: 'Learning new JavaScript frameworks. The journey never stops! 💻',
        time: '1d ago'
    }
];

function loadUserPosts() {
    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = '';
    
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    const userName = userData?.fullName || 'You';
    
    userPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <div class="post-info">
                    <strong>${userName}</strong>
                    <span class="post-time">${post.time}</span>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
        `;
        tabContent.appendChild(postCard);
    });
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.tab-btn').classList.add('active');
    
    const tabContent = document.getElementById('tabContent');
    
    if (tabName === 'posts') {
        loadUserPosts();
    } else {
        tabContent.innerHTML = `
            <div class="post-card">
                <p style="text-align:center; color: var(--gray)">No ${tabName} yet.</p>
            </div>
        `;
    }
}

function openEditModal() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData')) || {};
    
    document.getElementById('editName').value = userData.fullName || '';
    document.getElementById('editUsername').value = userData.username || '';
    document.getElementById('editBio').value = userData.bio || '';
    document.getElementById('editLocation').value = userData.location || '';
    
    document.getElementById('editModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData')) || {};
    
    userData.fullName = document.getElementById('editName').value.trim();
    userData.username = document.getElementById('editUsername').value.trim();
    userData.bio = document.getElementById('editBio').value.trim();
    userData.location = document.getElementById('editLocation').value.trim();
    
    if (!userData.fullName || !userData.username) {
        alert('Name and username are required!');
        return;
    }
    
    localStorage.setItem('bitstreamUserData', JSON.stringify(userData));
    
    loadProfileData();
    closeEditModal();
    
    showNotification('Profile updated successfully!');
});

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