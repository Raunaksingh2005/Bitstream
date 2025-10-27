// Check if user is logged in
window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('bitstreamUser');

    
    loadUserData();
    loadSamplePosts();
});

// Load user data
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    if (userData) {
        document.getElementById('userName').textContent = userData.fullName || 'Campus User';
        document.getElementById('userHandle').textContent = '@' + (userData.username || 'campus');
    }
}

// Sample posts data
const samplePosts = [
    {
        author: 'Raunak Singh',
        username: 'raunak',
        time: '2h ago',
        content: 'Excited to launch Bitstream! 🚀 This is going to change how students connect and share. #Bitstream #Innovation',
        likes: 23,
        retweets: 5,
        comments: 8
    },
    {
        author: 'Ravmeet Singh',
        username: 'ravmeet',
        time: '3h ago',
        content: 'Working on some amazing UI/UX designs today. The new dashboard looks incredible! 💻✨ #WebDesign #UI',
        likes: 31,
        retweets: 7,
        comments: 12
    },
    {
        author: 'Rishit Verma',
        username: 'rishit',
        time: '5h ago',
        content: 'Just finished implementing the backend APIs. Everything is running smoothly! 🔧 #Backend #Development',
        likes: 19,
        retweets: 4,
        comments: 6
    }
];

// Load sample posts
function loadSamplePosts() {
    const postsFeed = document.getElementById('postsFeed');
    samplePosts.forEach(post => {
        postsFeed.appendChild(createPostElement(post));
    });
}

// Create post element
function createPostElement(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
        <div class="post-header">
            <svg class="post-avatar" width="48" height="48" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="url(#post-gradient-${post.username})"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="white" font-size="20" font-weight="600">${post.author.charAt(0)}</text>
                <defs>
                    <linearGradient id="post-gradient-${post.username}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#5b8def"/>
                        <stop offset="100%" style="stop-color:#f5b942"/>
                    </linearGradient>
                </defs>
            </svg>
            <div class="post-info">
                <h4>${post.author}</h4>
                <p class="post-meta">@${post.username} · ${post.time}</p>
            </div>
        </div>
        <div class="post-content">${post.content}</div>
        <div class="post-actions">
            <button class="action-btn" onclick="likePost(this)">
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
    return postCard;
}

// Character counter
const postContent = document.getElementById('postContent');
const charCount = document.getElementById('charCount');

postContent.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    if (count > 250) {
        charCount.classList.add('warning');
    } else {
        charCount.classList.remove('warning');
    }
    
    if (count > 270) {
        charCount.classList.add('danger');
    } else {
        charCount.classList.remove('danger');
    }
});

// Create new post
function createPost() {
    const content = postContent.value.trim();
    
    if (!content) {
        showNotification('Please write something!', 'error');
        return;
    }
    
    if (content.length > 280) {
        showNotification('Post is too long!', 'error');
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    const newPost = {
        author: userData?.fullName || 'You',
        username: userData?.username || 'you',
        time: 'just now',
        content: content,
        likes: 0,
        retweets: 0,
        comments: 0
    };
    
    const postsFeed = document.getElementById('postsFeed');
    postsFeed.insertBefore(createPostElement(newPost), postsFeed.firstChild);
    
    postContent.value = '';
    charCount.textContent = '0';
    
    showNotification('Post created successfully!', 'success');
}

// Like post
function likePost(button) {
    button.classList.toggle('liked');
    const likeCount = button.querySelector('span');
    const currentCount = parseInt(likeCount.textContent);
    
    if (button.classList.contains('liked')) {
        likeCount.textContent = currentCount + 1;
    } else {
        likeCount.textContent = currentCount - 1;
    }
}

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
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);