import React, { useState, useCallback } from 'react'; // Added useCallback for performance optimization
import PropTypes from 'prop-types'; // Added PropTypes for type checking

// Use a functional component with arrow function syntax
const Login = ({ onLogin }) => {
  // Use object destructuring for state to group related states
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  // Use useCallback to memoize the handler function
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  }, []);

  // Use useCallback to memoize the submit function
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Use a prop function for login instead of console.log
    onLogin(email, password);

    // Reset form and error message
    setCredentials({ email: '', password: '' });
    setErrorMessage('');
  }, [credentials, onLogin]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email" // Added name attribute for handleChange
            type="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            autoComplete="username" // Added autoComplete for better UX and security
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password" // Added name attribute for handleChange
            type="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            autoComplete="current-password" // Added autoComplete for better UX and security
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

// Add PropTypes for type checking
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;