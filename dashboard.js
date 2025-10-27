// Check authentication
window.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('bitstreamUser');
    
    
    loadUserData();
    loadSamplePosts();
});

// Load user data from localStorage
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    if (userData) {
        document.getElementById('userName').textContent = userData.fullName || 'Welcome User';
        document.getElementById('userEmail').textContent = userData.email || 'user@example.com';
    }
}

// Sample posts data
const samplePosts = [
    {
        author: 'Raunak Singh',
        username: '@raunak',
        time: '2h ago',
        content: 'Just finished building an amazing project for Front End Engineering! Excited to present Bitstream 🚀 #WebDevelopment #StudentLife',
        likes: 24,
        comments: 5,
        shares: 3
    },
    {
        author: 'Ravmeet Singh',
        username: '@ravmeet',
        time: '4h ago',
        content: 'Working on some cool UI/UX designs today! The power of CSS animations is incredible ✨ #Design #CSS',
        likes: 31,
        comments: 8,
        shares: 6
    },
    {
        author: 'Rishit Verma',
        username: '@rishit',
        time: '6h ago',
        content: 'Finally mastered JavaScript promises and async/await! Coding is so much fun when things click 💡 #JavaScript #Learning',
        likes: 19,
        comments: 4,
        shares: 2
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
        <div class="post-card-header">
            <div class="post-author">
                <div class="author-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="author-info">
                    <h4>${post.author}</h4>
                    <p>${post.username} · ${post.time}</p>
                </div>
            </div>
        </div>
        
        <div class="post-content">
            ${post.content}
        </div>
        
        <div class="post-interactions">
            <button class="interaction-btn" onclick="likePost(this)">
                <i class="fas fa-heart"></i>
                <span>${post.likes}</span>
            </button>
            <button class="interaction-btn">
                <i class="fas fa-comment"></i>
                <span>${post.comments}</span>
            </button>
            <button class="interaction-btn">
                <i class="fas fa-share"></i>
                <span>${post.shares}</span>
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
    charCount.textContent = `${count}/280`;
    
    if (count > 250) {
        charCount.style.color = '#f59e0b';
    } else if (count > 270) {
        charCount.style.color = '#dc2626';
    } else {
        charCount.style.color = '#64748b';
    }
});

// Create new post
function createPost() {
    const content = postContent.value.trim();
    
    if (!content) {
        alert('Please write something before posting!');
        return;
    }
    
    if (content.length > 280) {
        alert('Post is too long! Maximum 280 characters.');
        return;
    }
    
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));
    const newPost = {
        author: userData?.fullName || 'You',
        username: '@' + (userData?.username || 'you'),
        time: 'just now',
        content: content,
        likes: 0,
        comments: 0,
        shares: 0
    };
    
    const postsFeed = document.getElementById('postsFeed');
    postsFeed.insertBefore(createPostElement(newPost), postsFeed.firstChild);
    
    // Clear textarea
    postContent.value = '';
    charCount.textContent = '0/280';
    charCount.style.color = '#64748b';
    
    // Show success message
    showNotification('Post created successfully!', 'success');
}

// Like post function
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
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        border-radius: 0.75rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
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