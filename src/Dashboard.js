// src/Dashboard.js
const { useState, useEffect } = React;

function Dashboard() {
  // 1. Create state for the list of posts and the new post content
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);

  // 2. This 'useEffect' runs ONCE when the component loads
  // It replaces your old loadSamplePosts() function
  useEffect(() => {
    // Fetch all posts from the server
    const fetchPosts = async () => {
      try {
        // Sort by id in descending order to show newest first
        const response = await fetch('http://localhost:3001/posts?_sort=id&_order=desc');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // The empty [] means this runs only once on load

  // 3. This runs when the "Post" button is clicked
  // It replaces your old createPost() function
  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Please write something before posting!');
      return;
    }

    // Get the logged-in user's data from localStorage
    const userData = JSON.parse(localStorage.getItem('bitstreamUserData'));

    // 4. Create the new post object to save to the server
    const newPost = {
      userId: userData.id,
      author: userData.fullName || 'You',
      username: '@' + (userData.username || 'you'),
      time: 'just now',
      content: content,
      likes: 0,
      comments: 0,
      shares: 0
    };

    // 5. Send the new post to the 'json-server'
    try {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const savedPost = await response.json();

      // 6. Add the new post to the top of the feed (in our state)
      setPosts([savedPost, ...posts]);
      
      // 7. Clear the textarea
      setContent('');
      setCharCount(0);

    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // 8. This replaces your old char-count event listener
  const handleTextareaChange = (e) => {
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  // This will be a simple "like" clicker.
  const handleLike = (postId) => {
    // We update the 'posts' state
    setPosts(posts.map(post => {
      // Find the post we liked
      if (post.id === postId) {
        // Check if we've already "liked" it (a simple way)
        if (post.liked) {
          return { ...post, likes: post.likes - 1, liked: false };
        } else {
          return { ...post, likes: post.likes + 1, liked: true };
        }
      }
      return post;
    }));
  };

  // 9. This is the HTML for the feed, rendered by React
  return (
    <React.Fragment>
      <div className="create-post-card">
        <form onSubmit={handleCreatePost}>
          <div className="post-header">
            <div className="post-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <textarea
              id="postContent"
              placeholder="What's happening?"
              maxLength="280"
              value={content}
              onChange={handleTextareaChange}
            ></textarea>
          </div>
          
          <div className="post-actions">
            <div className="post-options">
              {/* THIS IS THE FIXED LINE */}
              <button type="button" className="option-btn" title="Add Image">
                <i className="fas fa-image"></i>
              </button>
              <button type="button" className="option-btn" title="Add Emoji">
                <i className="fas fa-smile"></i>
              </button>
              <button type="button" className="option-btn" title="Add GIF">
                <i className="fas fa-film"></i>
              </button>
            </div>
            
            <div className="post-submit">
              <span className="char-count" id="charCount">
                {charCount}/280
              </span>
              <button type="submit" className="btn-post">
                <i className="fas fa-paper-plane"></i>
                Post
              </button>
            </div>
          </div>
        </form>
      </div>

      <div id="postsFeed" className="posts-feed">
        {/* We map over the 'posts' state to create a card for each one */}
        {posts.map(post => (
          <div className="post-card" key={post.id}>
            <div className="post-card-header">
              <div className="post-author">
                <div className="author-avatar">
                  <i className="fas fa-user-circle"></i>
                </div>
                <div className="author-info">
                  <h4>{post.author}</h4>
                  <p>{post.username} · {post.time}</p>
                </div>
              </div>
            </div>
            
            <div className="post-content">
              {post.content}
            </div>
            
            <div className="post-interactions">
              <button 
                className={`interaction-btn ${post.liked ? 'liked' : ''}`}
                onClick={() => handleLike(post.id)}
              >
                <i className="fas fa-heart"></i>
                <span>{post.likes}</span>
              </button>
              <button className="interaction-btn">
                <i className="fas fa-comment"></i>
                <span>{post.comments}</span>
              </button>
              <button className="interaction-btn">
                <i className="fas fa-share"></i>
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

// 10. Tell React to render this component into the <main id="root"> tag
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Dashboard />);