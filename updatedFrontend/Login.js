import React, { useState, useCallback } from 'react'; // Added useCallback for optimization

// Use TypeScript for better type checking
interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  // Use a single state object for form data
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Use useCallback to memoize the handleChange function
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Use useCallback to memoize the handleSubmit function
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // TODO: Implement actual login logic here
    console.log('Email:', email, 'Password:', password);

    // Clear form data and error message
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
            minLength={8} // Added minimum length requirement
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;