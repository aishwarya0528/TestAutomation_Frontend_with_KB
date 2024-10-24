import React, { useState, useCallback } from 'react'; // Added useCallback for performance optimization

const Login = () => {
  // Use object state for form fields
  const [formData, setFormData] = useState({ email: '', password: '' }); // Consolidated state
  const [errorMessage, setErrorMessage] = useState('');

  // Memoize event handlers for better performance
  const handleChange = useCallback((e) => { // Added useCallback
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => { // Added useCallback
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // TODO: Replace with actual API call
    console.log('Email:', email, 'Password:', password);

    // Reset form and error message
    setFormData({ email: '', password: '' });
    setErrorMessage('');
  }, [formData]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email" // Added name attribute
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            autoComplete="username" // Added for better autocomplete
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password" // Added name attribute
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            autoComplete="current-password" // Added for better autocomplete
            minLength="8" // Added minimum length for security
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default React.memo(Login); // Wrapped with React.memo for performance