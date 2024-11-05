import React, { useState, useCallback } from 'react'; // Added useCallback for performance optimization

// Use TypeScript or PropTypes for better type checking
const Login = () => {
  // Use object state for related fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  // Use useCallback to memoize the handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Use useCallback to memoize the submit handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Use a secure logging method in production
    console.log('Email:', email, 'Password:', password);

    // Clear form data and error message
    setFormData({ email: '', password: '' });
    setErrorMessage('');

    // TODO: Implement actual login logic here
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
            name="email" // Added name attribute for handleChange
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            autoComplete="email" // Added for better UX
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
            autoComplete="current-password" // Added for better UX
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default React.memo(Login); // Memoize the component to prevent unnecessary re-renders