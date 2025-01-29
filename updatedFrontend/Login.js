import React, { useState, useCallback } from 'react'; // Added useCallback for performance optimization
import PropTypes from 'prop-types'; // Added PropTypes for type checking

// Using arrow function for consistent style
const Login = ({ onLoginSuccess }) => { // Added prop for handling successful login
  const [formData, setFormData] = useState({ email: '', password: '' }); // Combined state into a single object
  const [errorMessage, setErrorMessage] = useState('');

  // Using useCallback to memoize the handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // TODO: Replace with actual login logic
    console.log('Email:', email, 'Password:', password);
    onLoginSuccess(email); // Call the prop function on successful login

    setFormData({ email: '', password: '' });
    setErrorMessage('');
  }, [formData, onLoginSuccess]);

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
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            autoComplete="username" // Added for better autofill support
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password" // Added name attribute for handleChange
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            autoComplete="current-password" // Added for better autofill support
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

// Added PropTypes for type checking
Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default Login;