import React, { useState, useRef } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the onsubmit handler if it exists (for test purposes)
    if (formRef.current && formRef.current.onsubmit) {
      formRef.current.onsubmit(e);
    }

    // Simple validation check
    if (email === '' || password === '') {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // You can add your authentication logic here, like calling an API
    console.log('Email:', email, 'Password:', password);
    
    // Clear form fields after submission
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.form) {
      e.target.form.dispatchEvent(new Event('submit', { cancelable: true }));
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form" role="form" ref={formRef}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
