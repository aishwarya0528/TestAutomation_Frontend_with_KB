Here are the 10 test cases based on sections 5.1 to 5.10:

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
test('removes error message after successful submission', () => {
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

// 5.6
test('submits form with entered email and password', () => {
  const mockSubmit = jest.fn();
  render(<Login onSubmit={mockSubmit} />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(mockSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
});

// 5.7
test('logs entered email and password to console on submission', () => {
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
test('fails to submit form with invalid email format', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'invalidemail');
  userEvent.type(passwordInput, 'password123');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
});

// 5.9
test('fails to submit form with password less than 8 characters', () => {
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
test('fails to submit form when password doesn\'t match confirm password', () => {
  render(<Login />);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const submitButton = screen.getByRole('button', { name: /login/i });
  
  userEvent.type(emailInput, 'test@example.com');
  userEvent.type(passwordInput, 'password123');
  userEvent.type(confirmPasswordInput, 'differentpassword');
  fireEvent.click(submitButton);
  
  expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
});
```