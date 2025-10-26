// Check authentication
window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('bitstreamUser');

    
    loadProfileData();
    loadUserPosts();
});

// Load profile data
function loadProfileData() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    if (userData) {
        document.getElementById('profileName').textContent = userData.fullName || 'Campus User';
        document.getElementById('profileHandle').textContent = '@' + (userData.username || 'campus');
        
        if (userData.bio) {
            document.getElementById('profileBio').textContent = userData.bio;
        }
    }
}

// Sample user posts
const userPosts = [
    {
        content: 'Just completed my Project Evaluation 2 for Front End Engineering! Excited to showcase Bitstream 🚀',
        time: '1h ago',
        likes: 28,
        retweets: 6,
        comments: 10
    },
    {
        content: 'Building amazing things with HTML, CSS, and JavaScript! The learning journey never stops 💻',
        time: '5h ago',
        likes: 22,
        retweets: 4,
        comments: 7
    },
    {
        content: 'Working on some cool features for Bitstream. Stay tuned! ✨',
        time: '1d ago',
        likes: 35,
        retweets: 8,
        comments: 12
    }
];

// Load user posts
function loadUserPosts() {
    const tabContent = document.getElementById('tabContent');
    tabContent.innerHTML = '';
    
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    const username = userData?.username || 'campus';
    const fullName = userData?.fullName || 'Campus User';
    
    userPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-header">
                <svg class="post-avatar" width="48" height="48" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="28" fill="url(#user-post-gradient)"/>
                    <text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="white" font-size="20" font-weight="600">${fullName.charAt(0)}</text>
                    <defs>
                        <linearGradient id="user-post-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#5b8def"/>
                            <stop offset="100%" style="stop-color:#f5b942"/>
                        </linearGradient>
                    </defs>
                </svg>
                <div class="post-info">
                    <h4>${fullName}</h4>
                    <p class="post-meta">@${username} · ${post.time}</p>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${post.likes}</span>
                </button>
                <button class="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${post.retweets}</span>
                </button>
                <button class="action-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${post.comments}</span>
                </button>
            </div>
        `;
        tabContent.appendChild(postCard);
    });
}

// Switch tabs
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const tabContent = document.getElementById('tabContent');
    
    switch(tabName) {
        case 'posts':
            loadUserPosts();
            break;
        case 'replies':
            tabContent.innerHTML = '<div class="post-card"><p style="text-align:center; color: rgba(255,255,255,0.6);">No replies yet.</p></div>';
            break;
        case 'media':
            tabContent.innerHTML = '<div class="post-card"><p style="text-align:center; color: rgba(255,255,255,0.6);">No media posts yet.</p></div>';
            break;
        case 'likes':
            tabContent.innerHTML = '<div class="post-card"><p style="text-align:center; color: rgba(255,255,255,0.6);">No liked posts yet.</p></div>';
            break;
    }
}

// Open edit modal
function openEditModal() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData')) || {};
    
    document.getElementById('editName').value = userData.fullName || '';
    document.getElementById('editUsername').value = userData.username || '';
    document.getElementById('editBio').value = userData.bio || '';
    document.getElementById('editLocation').value = userData.location || '';
    
    document.getElementById('editModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Handle edit profile form submission
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData')) || {};
    
    userData.fullName = document.getElementById('editName').value.trim();
    userData.username = document.getElementById('editUsername').value.trim();
    userData.bio = document.getElementById('editBio').value.trim();
    userData.location = document.getElementById('editLocation').value.trim();
    
    if (!userData.fullName || !userData.username) {
        showNotification('Name and username are required!', 'error');
        return;
    }
    
    localStorage.setItem('bitstreamUserData', JSON.stringify(userData));
    
    loadProfileData();
    closeEditModal();
    showNotification('Profile updated successfully!', 'success');
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('editModal');
    if (e.target === modal) {
        closeEditModal();
    }
});

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('bitstreamUser');
        window.location.href = 'login.html';
    }
}

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
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
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
    .post-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .post-avatar { width: 48px; height: 48px; }
    .post-info h4 { font-size: 16px; margin-bottom: 2px; }
    .post-meta { font-size: 14px; color: rgba(255, 255, 255, 0.5); }
    .post-content { margin-bottom: 16px; line-height: 1.6; color: rgba(255, 255, 255, 0.9); }
    .post-actions { display: flex; gap: 24px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); }
    .action-btn { display: flex; align-items: center; gap: 6px; background: none; border: none; color: rgba(255, 255, 255, 0.6); cursor: pointer; font-size: 14px; transition: all 0.3s; }
    .action-btn:hover { color: var(--accent); }
`;
document.head.appendChild(style);