import React, { useState } from 'react';
//import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation check
    if (email.trim() === '' || password.trim() === '') {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // You can add your authentication logic here, like calling an API
    console.log('Email:', email, 'Password:', password);
    // Reset form fields after submission
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form" data-testid="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            aria-describedby="email-error"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            aria-describedby="password-error"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;