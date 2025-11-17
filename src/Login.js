// src/Login.js
const { useState, useEffect } = React;

function Login() {
  const [username, setUsername] = useState(''); // This can be email OR username
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  // This is now 'async' to wait for the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    // --- NEW, FIXED LOGIC STARTS HERE ---
    try {
      // 1. Check if the input looks like an email or a username
      const isEmail = username.includes('@');
      const queryParam = isEmail 
        ? `email=${username}` 
        : `username=${username}`;

      // 2. Fetch the user with the specific query
      const response = await fetch(`http://localhost:3001/users?${queryParam}`);
      const users = await response.json();

      // 3. Check if ONE user was found and if the password matches
      if (users.length === 1 && users[0].password === password) {
        
        // 4. (IMPORTANT) Save the found user to localStorage for your OTHER pages
        const foundUser = users[0];
        localStorage.setItem('bitstreamUserData', JSON.stringify(foundUser));
        localStorage.setItem('bitstreamUser', foundUser.email);
        
        if (remember) {
          localStorage.setItem('rememberMe', 'true');
        }

        // 5. Redirect to the profile page
        window.location.href = 'profile.html';

      } else {
        // 6. If no user or wrong password
        alert('Invalid email/username or password');
      }

    } catch (error) {
      alert('Could not connect to the server. Please make sure it is running.');
      console.error('Error:', error);
    }
  };
  
  // This "Remember Me" logic is the same as before
  useEffect(() => {
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedUser = localStorage.getItem('bitstreamUser');
        if (savedUser) {
            setUsername(savedUser);
            setRemember(true);
        }
    }
  }, []);

  // --- (Your JSX/HTML code is identical) ---
  return (
    <div className="auth-card">
      <div className="logo">
        <i className="fas fa-stream"></i>
        <span>Bitstream</span>
      </div>
      <h1>Welcome Back!</h1>
      <p className="subtitle">Sign in to continue to your account</p>

      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="text"
            id="username"
            placeholder="Email or Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-options">
          <label className="checkbox">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
        <button type="submit" className="btn btn-primary btn-full">
          <i className="fas fa-sign-in-alt"></i>
          Sign In
        </button>
      </form>
      <p className="signup-link">
        Don't have an account? <a href="signup.html">Sign up</a>
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Login />);