Based on the provided JavaScript files and the guidelines, here are the 10 test cases corresponding to sections 5.1 through 5.10 from the 'test_automation_frontend_kb' knowledge base:

```javascript
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

// 5.1
test('renders login form with email and password inputs', () => {
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
test('does not show error message initially', () => {
  render(<Login />);
  const errorMessage = screen.queryByText('Please fill in all fields');
  expect(errorMessage).not.toBeInTheDocument();
});

// 5.6
test('clears error message after successful submission', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  fireEvent.click(submitButton);
  expect(screen.getByText('Please fill in all fields')).toBeInTheDocument();
  
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.queryByText('Please fill in all fields')).not.toBeInTheDocument();
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
  consoleSpy.mockRestore();
});

// 5.8
test('fails when checking for non-existent element', () => {
  render(<Login />);
  expect(screen.getByText('Welcome to Login')).toBeInTheDocument();
});

// 5.9
test('fails when checking for incorrect button text', () => {
  render(<Login />);
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
});

// 5.10
test('fails when expecting incorrect error message', () => {
  render(<Login />);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
});
```

These 10 test cases correspond exactly to sections 5.1 through 5.10 mentioned in the 'test_automation_frontend_kb' knowledge base, as requested.