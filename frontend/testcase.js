Based on the provided JavaScript file for the Login.js component and the instructions to create exactly 10 test cases corresponding to sections 5.1 through 5.10, here are the 10 test cases:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1
test('renders login form with email and password fields', () => {
  render(<Login />);
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

// 5.2
test('allows entering email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');

  expect(emailInput).toHaveValue('test@example.com');
  expect(passwordInput).toHaveValue('password123');
});

// 5.3
test('displays error message when submitting empty form', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  fireEvent.click(submitButton);

  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
});

// 5.4
test('clears form fields after successful submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(emailInput).toHaveValue('');
  expect(passwordInput).toHaveValue('');
});

// 5.5
test('submits form with entered email and password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
});

// 5.6
test('displays login button', () => {
  render(<Login />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

// 5.7
test('logs email and password to console on successful submission', () => {
  const consoleSpy = jest.spyOn(console, 'log');
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(consoleSpy).toHaveBeenCalledWith('Email:', 'test@example.com', 'Password:', 'password123');
});

// 5.8
test('fails to submit form with invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.getByText('Invalid email format')).toBeInTheDocument();
});

// 5.9
test('fails to submit form with password shorter than 8 characters', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'short');
  fireEvent.click(submitButton);

  expect(screen.getByText('Password must be at least 8 characters long')).toBeInTheDocument();
});

// 5.10
test('displays success message on form submission', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });

  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);

  expect(screen.getByText('Login successful!')).toBeInTheDocument();
});
```

These 10 test cases correspond exactly to the sections 5.1 through 5.10 as specified in the instructions.