// src/Signup.js
const { useState } = React;

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [terms, setTerms] = useState(false);

  // This is now an 'async' function to wait for the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- (All your old validation logic is the same) ---
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      alert('Username can only contain letters, numbers, and underscores');
      return;
    }

    // --- NEW LOGIC STARTS HERE ---

    // 1. Create the user data object to send to the server
    const userData = {
      fullName: fullName,
      email: email,
      username: username,
      password: password, // We're saving the password now
      bio: 'New Bitstream user',
      joinedDate: new Date().toLocaleDateString(),
      location: '',
      settings: {
        publicProfile: true,
        allowMessages: true,
        showActivity: true,
        emailNotif: true,
        pushNotif: true,
        followerNotif: true
      }
    };

    try {
      // 2. Send this data to your new 'json-server'
      const response = await fetch('http://10.30.5.46:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        alert('Error creating account. This email or username might already exist.');
        return;
      }
      
      const newUser = await response.json();

      // 3. (IMPORTANT) Still save to localStorage for your OTHER pages
      localStorage.setItem('bitstreamUserData', JSON.stringify(newUser));
      localStorage.setItem('bitstreamUser', newUser.email);

      // 4. Redirect just like before
      alert('Account created successfully! Redirecting...');
      window.location.href = 'profile.html';

    } catch (error) {
      alert('Could not connect to the server. Please make sure it is running.');
      console.error('Error:', error);
    }
  };

  // --- (The rest of your JSX/HTML code is identical) ---
  return (
    <div className="auth-card">
      <div className="logo">
        <i className="fas fa-stream"></i>
        <span>Bitstream</span>
      </div>
      <h1>Create Account</h1>
      <p className="subtitle">Join Bitstream community today</p>

      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-at"></i>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="terms-checkbox">
          <label>
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
            />
            <span>I agree to the <a href="#">Terms & Conditions</a></span>
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-full">
          <i className="fas fa-user-plus"></i>
          Create Account
        </button>
      </form>
      <p className="login-link">
        Already have an account? <a href="login.html">Sign in</a>
      </p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Signup />);